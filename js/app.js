// --- KONFIGURASI DATA UTAMA ---
// Menyesuaikan kategori produk dengan tombol di HTML (topping, makanan, dingin, panas, jajanan)
const menuList = [
    // --- TOPPING ---
    { id: 'P0001', nama: 'Choco Crunch', kategori: 'topping', harga: 3000, stok: 99, gambar: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0002', nama: 'Keju Parut', kategori: 'topping', harga: 4000, stok: 99, gambar: 'https://images.unsplash.com/photo-1552763427-4d14eb306323?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0003', nama: 'Almond Slice', kategori: 'topping', harga: 5000, stok: 99, gambar: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d96?w=300&auto=format&fit=crop&q=60' },

    // --- MAKANAN / BAKARAN ---
    { id: 'P0007', nama: 'Seblak Original', kategori: 'makanan', harga: 15000, stok: 99, gambar: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0008', nama: 'Bakaran Sosis Jumbo', kategori: 'makanan', harga: 12000, stok: 99, gambar: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&auto=format&fit=crop&q=60' },

    // --- MINUMAN DINGIN ---
    { id: 'P0013', nama: 'Es Teh Manis', kategori: 'dingin', harga: 5000, stok: 99, gambar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0014', nama: 'Es Jeruk Peras', kategori: 'dingin', harga: 7000, stok: 99, gambar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=300&auto=format&fit=crop&q=60' },
    
    // --- MINUMAN HANGAT ---
    { id: 'P0015', nama: 'Kopi Hitam Hangat', kategori: 'panas', harga: 5000, stok: 99, gambar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=300&auto=format&fit=crop&q=60' },

    // --- JAJANAN / ROKOK ---
    { id: 'P0016', nama: 'Keripik Kaca', kategori: 'jajanan', harga: 8000, stok: 99, gambar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=300&auto=format&fit=crop&q=60' }
];

// State Aplikasi
let keranjang = [];
let riwayatTransaksi = JSON.parse(localStorage.getItem('aya_transaksi_v3')) || [];
let pengeluaran = JSON.parse(localStorage.getItem('aya_pengeluaran_v3')) || [];
let currentKategori = 'topping';
let chartInstance = null;

// Sinkronisasi Firebase Realtime Database (Gunakan pengecekan library yang aman)
if (typeof db !== 'undefined') {
    db.ref('transaksi').on('value', (snapshot) => {
        const data = snapshot.val();
        riwayatTransaksi = data ? Object.values(data).sort((a, b) => b.id.localeCompare(a.id)) : [];
        localStorage.setItem('aya_transaksi_v3', JSON.stringify(riwayatTransaksi));
        updateLaporan();
    });

    db.ref('pengeluaran').on('value', (snapshot) => {
        const data = snapshot.val();
        pengeluaran = data ? Object.values(data).sort((a, b) => b.id.localeCompare(a.id)) : [];
        localStorage.setItem('aya_pengeluaran_v3', JSON.stringify(pengeluaran));
        renderPengeluaran();
        updateLaporan();
    });
}

// --- FUNGSI MANAJEMEN TABS ---
function switchTab(tabId) {
    // Menyembunyikan seluruh tab bawaan
    document.getElementById('tab-kasir').classList.add('hidden');
    document.getElementById('tab-pengeluaran').classList.add('hidden');
    document.getElementById('tab-laporan').classList.add('hidden');

    // Menampilkan tab tujuan
    document.getElementById('tab-' + tabId).classList.remove('hidden');

    if (tabId === 'kasir') {
        renderMenu();
        renderKeranjang();
    }
    if (tabId === 'pengeluaran') renderPengeluaran();
    if (tabId === 'laporan') updateLaporan();
}

// --- FUNGSI FORMAT MATA UANG & TANGGAL ---
function formatRupiah(angka) {
    return 'Rp ' + parseInt(angka || 0).toLocaleString('id-ID');
}

function generateCustomId(prefix) {
    const d = new Date();
    const dateStr = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${dateStr}-${randomStr}`;
}

// --- FUNGSI TRANSAKSI & KERANJANG ---
function filterKategori(kat) {
    currentKategori = kat;
    
    // Sinkronisasi gaya aktif tombol HTML lama ke HTML baru
    const mapBtnId = {
        'topping': 'btn-kat-topping',
        'makanan': 'btn-kat-makanan',
        'dingin': 'btn-kat-dingin',
        'panas': 'btn-kat-panas',
        'jajanan': 'btn-kat-jajanan'
    };

    Object.values(mapBtnId).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.className = "px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs sm:text-sm rounded-lg transition cursor-pointer whitespace-nowrap";
        }
    });

    const activeEl = document.getElementById(mapBtnId[kat]);
    if (activeEl) {
        activeEl.className = "px-4 py-2 bg-orange-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow transition cursor-pointer whitespace-nowrap";
    }

    renderMenu();
}

function renderMenu() {
    const container = document.getElementById('container-menu');
    if (!container) return;
    container.innerHTML = '';

    const filtered = menuList.filter(item => item.kategori === currentKategori);
    
    if(filtered.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-center col-span-3 py-8 text-xs">Belum ada item untuk kategori ini.</p>';
        return;
    }

    filtered.forEach(item => {
        const itemKeranjang = keranjang.find(k => k.id === item.id);
        const qty = itemKeranjang ? itemKeranjang.qty : 0;

        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between p-3';
        card.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}" class="w-full h-24 object-cover rounded-lg mb-2">
            <div>
                <h4 class="font-bold text-gray-800 text-xs line-clamp-2">${item.nama}</h4>
                <p class="text-orange-600 font-semibold text-xs mt-1">${formatRupiah(item.harga)}</p>
            </div>
            <div class="mt-2">
                ${qty === 0 ? 
                    `<button onclick="tambahKeKeranjang('${item.id}')" class="w-full bg-orange-50 text-orange-600 font-bold py-1.5 rounded-lg text-[11px] hover:bg-orange-100 transition cursor-pointer">Tambah</button>` :
                    `<div class="flex items-center justify-between bg-orange-50 rounded-lg p-1">
                        <button onclick="kurangDariKeranjang('${item.id}')" class="w-6 h-6 bg-white text-orange-600 rounded font-bold text-xs shadow-sm flex items-center justify-center cursor-pointer">-</button>
                        <span class="text-orange-700 font-bold text-xs">${qty}</span>
                        <button onclick="tambahKeKeranjang('${item.id}')" class="w-6 h-6 bg-white text-orange-600 rounded font-bold text-xs shadow-sm flex items-center justify-center cursor-pointer">+</button>
                    </div>`
                }
            </div>
        `;
        container.appendChild(card);
    });
}

function tambahKeKeranjang(id) {
    const produk = menuList.find(p => p.id === id);
    const item = keranjang.find(k => k.id === id);
    if (item) {
        item.qty++;
    } else {
        keranjang.push({ ...produk, qty: 1 });
    }
    renderMenu();
    renderKeranjang();
}

function kurangDariKeranjang(id) {
    const item = keranjang.find(k => k.id === id);
    if (item) {
        item.qty--;
        if (item.qty <= 0) keranjang = keranjang.filter(k => k.id !== id);
    }
    renderMenu();
    renderKeranjang();
}

// Sinkronisasi dengan input tambahan (Styrofoam, Ongkir) di HTML Baru
function updateKeranjang() {
    renderKeranjang();
}

function renderKeranjang() {
    const container = document.getElementById('tabelKeranjang'); // ID disesuaikan dengan HTML Baru
    const textTotalEl = document.getElementById('textTotal');   // ID disesuaikan dengan HTML Baru
    if (!container) return;

    if (keranjang.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-center py-4 text-xs">Belum ada item dipilih</p>';
        if (textTotalEl) textTotalEl.innerText = formatRupiah(0);
        return;
    }

    container.innerHTML = '';
    let totalProduk = 0;

    keranjang.forEach(item => {
        const subtotal = item.harga * item.qty;
        totalProduk += subtotal;
        
        const row = document.createElement('div');
        row.className = 'flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-100 mb-1.5';
        row.innerHTML = `
            <div>
                <h5 class="font-bold text-gray-800 text-xs">${item.nama}</h5>
                <p class="text-[10px] text-gray-500">${formatRupiah(item.harga)} x ${item.qty}</p>
            </div>
            <div class="text-right">
                <span class="font-bold text-gray-700 text-xs block">${formatRupiah(subtotal)}</span>
                <button onclick="hapusItemKeranjang('${item.id}')" class="text-[10px] text-red-500 hover:underline">Hapus</button>
            </div>
        `;
        container.appendChild(row);
    });

    // Menghitung Biaya Tambahan dari Form HTML
    const styrofoamQty = parseInt(document.getElementById('inputStyrofoam').value) || 0;
    const ongkirNominal = parseInt(document.getElementById('inputOngkir').value) || 0;
    const totalBiayaStyrofoam = styrofoamQty * 2000; // Asumsi harga styrofoam Rp 2.000

    const totalAkhir = totalProduk + totalBiayaStyrofoam + ongkirNominal;
    if (textTotalEl) textTotalEl.innerText = formatRupiah(totalAkhir);
    
    hitungKembalian();
}

function hapusItemKeranjang(id) {
    keranjang = keranjang.filter(k => k.id !== id);
    renderMenu();
    renderKeranjang();
}

function hitungKembalian() {
    const totalText = document.getElementById('textTotal').innerText.replace(/[^0-9]/g, '');
    const total = parseInt(totalText) || 0;
    const uangBayar = parseInt(document.getElementById('inputBayar').value) || 0;
    const kembalian = uangBayar - total;

    const textKembalianEl = document.getElementById('textKembalian');
    if (textKembalianEl) {
        textKembalianEl.innerText = kembalian >= 0 ? formatRupiah(kembalian) : 'Uang Kurang';
    }
}

// Mengatur kecocokan tipe pembayaran di antarmuka
let metodePembayaranTerpilih = 'TUNAI';
function setMetodePembayaran(metode) {
    metodePembayaranTerpilih = metode;
    ['TUNAI', 'QRIS', 'KONSUMSI'].forEach(m => {
        const btn = document.getElementById(`btn-bayar-${m.toLowerCase()}`);
        if(btn) {
            btn.className = "py-2 text-center text-[10px] font-bold rounded-lg bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer transition";
        }
    });
    const activeBtn = document.getElementById(`btn-bayar-${metode.toLowerCase()}`);
    if(activeBtn) {
        activeBtn.className = "py-2 text-center text-[10px] font-bold rounded-lg bg-orange-600 text-white shadow border border-orange-600 cursor-pointer transition";
    }
}

function tombolSimpanSaja() {
    if (keranjang.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }

    const totalText = document.getElementById('textTotal').innerText.replace(/[^0-9]/g, '');
    const total = parseInt(totalText) || 0;
    const idTrx = generateCustomId('TRX');
    
    const transaksiBaru = {
        id: idTrx,
        tanggal: new Date().toISOString(),
        items: keranjang,
        total: total,
        metode: metodePembayaranTerpilih
    };

    if (typeof db !== 'undefined') {
        db.ref('transaksi/' + idTrx).set(transaksiBaru)
            .then(() => resetSetelahTransaksi())
            .catch(err => alert('Gagal ke Firebase: ' + err.message));
    } else {
        riwayatTransaksi.unshift(transaksiBaru);
        localStorage.setItem('aya_transaksi_v3', JSON.stringify(riwayatTransaksi));
        resetSetelahTransaksi();
    }
}

function resetSetelahTransaksi() {
    keranjang = [];
    document.getElementById('inputStyrofoam').value = '';
    document.getElementById('inputOngkir').value = '';
    document.getElementById('inputBayar').value = '';
    renderKeranjang();
    filterKategori(currentKategori);
    alert('Transaksi Berhasil Disimpan!');
}

function bersihkanKeranjang() {
    keranjang = [];
    renderMenu();
    renderKeranjang();
}

// --- PENGELUARAN ---
function simpanPengeluaran() {
    const nama = document.getElementById('namaPengeluaran').value;
    const jumlah = parseInt(document.getElementById('biayaPengeluaran').value);
    
    if(!nama || !jumlah) {
        alert('Lengkapi nama dan biaya pengeluaran!');
        return;
    }

    const idOut = generateCustomId('OUT');
    const dataBaru = {
        id: idOut,
        tanggal: new Date().toISOString(),
        keterangan: nama,
        jumlah: jumlah
    };

    if (typeof db !== 'undefined') {
        db.ref('pengeluaran/' + idOut).set(dataBaru)
            .then(() => {
                document.getElementById('namaPengeluaran').value = '';
                document.getElementById('biayaPengeluaran').value = '';
                alert('Pengeluaran berhasil disimpan!');
            });
    } else {
        pengeluaran.unshift(dataBaru);
        localStorage.setItem('aya_pengeluaran_v3', JSON.stringify(pengeluaran));
        document.getElementById('namaPengeluaran').value = '';
        document.getElementById('biayaPengeluaran').value = '';
        renderPengeluaran();
        updateLaporan();
    }
}

function renderPengeluaran() {
    const container = document.getElementById('listPengeluaran'); // ID Sesuai HTML Baru
    if (!container) return;
    container.innerHTML = '';

    if (pengeluaran.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 py-4 text-xs">Belum ada catatan pengeluaran.</p>';
        return;
    }

    pengeluaran.forEach(out => {
        const tgl = new Date(out.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        const item = document.createElement('div');
        item.className = 'flex justify-between items-center py-2 text-xs';
        item.innerHTML = `
            <div>
                <span class="font-bold text-gray-800">${out.keterangan}</span>
                <p class="text-[10px] text-gray-400">${tgl} · ${out.id}</p>
            </div>
            <div class="flex items-center space-x-2">
                <span class="font-bold text-red-600">-${formatRupiah(out.jumlah)}</span>
                <button onclick="hapusPengeluaran('${out.id}')" class="text-red-500 hover:underline text-[10px] cursor-pointer">Hapus</button>
            </div>
        `;
        container.appendChild(item);
    });
}

function hapusPengeluaran(id) {
    if (!confirm('Hapus catatan pengeluaran ini?')) return;
    if (typeof db !== 'undefined') {
        db.ref('pengeluaran/' + id).remove();
    } else {
        pengeluaran = pengeluaran.filter(o => o.id !== id);
        localStorage.setItem('aya_pengeluaran_v3', JSON.stringify(pengeluaran));
        renderPengeluaran();
        updateLaporan();
    }
}

// --- REKAP & LAPORAN ---
function updateLaporan() {
    let omset = 0;
    let omsetTunai = 0;
    let omsetQris = 0;
    let omsetPersonal = 0;
    let totalOut = 0;
    const produkTerjual = {};

    riwayatTransaksi.forEach(trx => {
        omset += trx.total;
        if (trx.metode === 'TUNAI' || !trx.metode) omsetTunai += trx.total;
        if (trx.metode === 'QRIS') omsetQris += trx.total;
        if (trx.metode === 'KONSUMSI') omsetPersonal += trx.total;

        if (trx.items) {
            trx.items.forEach(item => {
                produkTerjual[item.nama] = (produkTerjual[item.nama] || 0) + item.qty;
            });
        }
    });

    pengeluaran.forEach(out => {
        totalOut += out.jumlah;
    });

    const labaRugi = omset - totalOut;

    // Sinkronisasi ID Sesuai dengan Dokumen HTML Baru Anda
    if (document.getElementById('statOmset')) document.getElementById('statOmset').innerText = formatRupiah(omset);
    if (document.getElementById('statOmsetTunai')) document.getElementById('statOmsetTunai').innerText = formatRupiah(omsetTunai);
    if (document.getElementById('statOmsetQris')) document.getElementById('statOmsetQris').innerText = formatRupiah(omsetQris);
    if (document.getElementById('statOmsetKonsumsi')) document.getElementById('statOmsetKonsumsi').innerText = formatRupiah(omsetPersonal);
    if (document.getElementById('statPengeluaran')) document.getElementById('statPengeluaran').innerText = formatRupiah(totalOut);
    if (document.getElementById('statNota')) document.getElementById('statNota').innerText = riwayatTransaksi.length + ' Nota';
    
    const cashRiil = 70000 + omsetTunai - totalOut; // Modal Harian Rp 70.000 + Tunai - Pengeluaran
    if (document.getElementById('statUangCash')) document.getElementById('statUangCash').innerText = formatRupiah(cashRiil);
    if (document.getElementById('statCashMasuk')) document.getElementById('statCashMasuk').innerText = formatRupiah(omsetTunai);
    if (document.getElementById('statBebanCash')) document.getElementById('statBebanCash').innerText = formatRupiah(totalOut);

    const statLabaEl = document.getElementById('statLabaRugi');
    const boxLabaRugi = document.getElementById('boxLabaRugi');
    if (statLabaEl) {
        statLabaEl.innerText = formatRupiah(labaRugi);
        if (labaRugi >= 0) {
            boxLabaRugi.className = "p-4 rounded-xl shadow border border-orange-100 bg-emerald-50 text-emerald-900 flex flex-col justify-between";
            statLabaEl.className = "text-2xl font-extrabold text-emerald-600";
        } else {
            boxLabaRugi.className = "p-4 rounded-xl shadow border border-orange-100 bg-red-50 text-red-900 flex flex-col justify-between";
            statLabaEl.className = "text-2xl font-extrabold text-red-600";
        }
    }

    // Render Riwayat Nota Ringkas di Laporan
    const riwayatNotaContainer = document.getElementById('riwayatNota');
    if (riwayatNotaContainer) {
        riwayatNotaContainer.innerHTML = '';
        if(riwayatTransaksi.length === 0) {
            riwayatNotaContainer.innerHTML = '<p class="text-gray-400 text-center text-xs py-4">Belum ada transaksi</p>';
        } else {
            riwayatTransaksi.forEach(trx => {
                const div = document.createElement('div');
                div.className = 'flex justify-between items-center text-xs border-b pb-2';
                div.innerHTML = `
                    <div>
                        <span class="font-mono font-bold">${trx.id}</span> [${trx.metode || 'TUNAI'}]
                        <p class="text-[10px] text-gray-400">${new Date(trx.tanggal).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div class="text-right">
                        <span class="font-bold">${formatRupiah(trx.total)}</span>
                        <button onclick="hapusTransaksi('${trx.id}')" class="text-red-500 block text-[10px] ml-auto cursor-pointer">Hapus</button>
                    </div>
                `;
                riwayatNotaContainer.appendChild(div);
            });
        }
    }

    // Render Detail Pengeluaran Periode Ini
    const rekapPengeluaranDetail = document.getElementById('rekapPengeluaranDetail');
    if (rekapPengeluaranDetail) {
        rekapPengeluaranDetail.innerHTML = '';
        if(pengeluaran.length === 0) {
            rekapPengeluaranDetail.innerHTML = '<p class="text-gray-400 text-center text-xs py-4">Belum ada pengeluaran</p>';
        } else {
            pengeluaran.forEach(out => {
                const div = document.createElement('div');
                div.className = 'flex justify-between text-xs border-b pb-1';
                div.innerHTML = `<span>${out.keterangan}</span><span class="text-red-600 font-bold">-${formatRupiah(out.jumlah)}</span>`;
                rekapPengeluaranDetail.appendChild(div);
            });
        }
    }

    // --- CHART.JS ---
    const ctx = document.getElementById('chartProdukLaku');
    if (!ctx) return;

    const sortedProduk = Object.entries(produkTerjual).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const labels = sortedProduk.map(p => p[0]);
    const dataValues = sortedProduk.map(p => p[1]);

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Qty Terjual',
                data: dataValues,
                backgroundColor: 'rgba(234, 88, 12, 0.2)',
                borderColor: 'rgba(234, 88, 12, 1)',
                borderWidth: 1.5,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}

function hapusTransaksi(id) {
    if (!confirm('Hapus transaksi ini?')) return;
    if (typeof db !== 'undefined') {
        db.ref('transaksi/' + id).remove();
    } else {
        riwayatTransaksi = riwayatTransaksi.filter(t => t.id !== id);
        localStorage.setItem('aya_transaksi_v3', JSON.stringify(riwayatTransaksi));
        updateLaporan();
    }
}

// Inisialisasi Awal Saat Halaman Selesai Dimuat
document.addEventListener("DOMContentLoaded", () => {
    filterKategori('topping');
    renderPengeluaran();
    updateLaporan();
});