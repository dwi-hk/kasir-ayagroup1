// --- KONFIGURASI DATA UTAMA ---
// Format ID Transaksi: TRX-YYYYMMDD-XXXX
// Format ID Pengeluaran: OUT-YYYYMMDD-XXXX
// Format ID Produk: PXXXX (Tetap kompatibel dengan V2)

const menuList = [
    // --- TOPPING ---
    { id: 'P0001', nama: 'Choco Crunch', kategori: 'topping', harga: 3000, stok: 99, gambar: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0002', nama: 'Keju Parut', kategori: 'topping', harga: 4000, stok: 99, gambar: 'https://images.unsplash.com/photo-1552763427-4d14eb306323?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0003', nama: 'Almond Slice', kategori: 'topping', harga: 5000, stok: 99, gambar: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d96?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0004', nama: 'Oreo Crumb', kategori: 'topping', harga: 3000, stok: 99, gambar: 'https://images.unsplash.com/photo-1553456523-33c861de216c?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0005', nama: 'Milo Bubuk', kategori: 'topping', harga: 4000, stok: 99, gambar: 'https://images.unsplash.com/photo-1584949514123-47bbfae57b40?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0006', nama: 'Kacang Sangrai', kategori: 'topping', harga: 3000, stok: 99, gambar: 'https://images.unsplash.com/photo-1567894252391-7686b245dc71?w=300&auto=format&fit=crop&q=60' },

    // --- BASE ---
    { id: 'P0007', nama: 'Original Base Large', kategori: 'base', harga: 15000, stok: 99, gambar: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0008', nama: 'Original Base Medium', kategori: 'base', harga: 12000, stok: 99, gambar: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0009', nama: 'Pandan Base Large', kategori: 'base', harga: 17000, stok: 99, gambar: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0010', nama: 'Pandan Base Medium', kategori: 'base', harga: 14000, stok: 99, gambar: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0011', nama: 'Red Velvet Base Large', kategori: 'base', harga: 18000, stok: 99, gambar: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0012', nama: 'Red Velvet Base Medium', kategori: 'base', harga: 15000, stok: 99, gambar: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&auto=format&fit=crop&q=60' },

    // --- SAUCE ---
    { id: 'P0013', nama: 'Cokelat Lumer', kategori: 'sauce', harga: 2000, stok: 99, gambar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0014', nama: 'Matcha Glaze', kategori: 'sauce', harga: 3000, stok: 99, gambar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0015', nama: 'Tiramisu Glaze', kategori: 'sauce', harga: 3000, stok: 99, gambar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0016', nama: 'Susu Kental Manis', kategori: 'sauce', harga: 1000, stok: 99, gambar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=300&auto=format&fit=crop&q=60' },
    { id: 'P0017', nama: 'Caramel Sauce', kategori: 'sauce', harga: 3000, stok: 99, gambar: 'https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=300&auto=format&fit=crop&q=60' }
];

// State Aplikasi Kompatibel V3 (Fallback ke LocalStorage jika Firebase Offline)
let keranjang = [];
let riwayatTransaksi = JSON.parse(localStorage.getItem('aya_transaksi_v3')) || [];
let pengeluaran = JSON.parse(localStorage.getItem('aya_pengeluaran_v3')) || [];
let currentKategori = 'topping';
let chartInstance = null;

// Sinkronisasi Firebase Realtime Database
if (db) {
    db.ref('transaksi').on('value', (snapshot) => {
        const data = snapshot.val();
        riwayatTransaksi = data ? Object.values(data).sort((a, b) => b.id.localeCompare(a.id)) : [];
        localStorage.setItem('aya_transaksi_v3', JSON.stringify(riwayatTransaksi));
        
        // Pebaikan: Selalu update laporan agar grafik & hitungan laba rugi langsung terisi otomatis
        updateLaporan();
    });

    db.ref('pengeluaran').on('value', (snapshot) => {
        const data = snapshot.val();
        pengeluaran = data ? Object.values(data).sort((a, b) => b.id.localeCompare(a.id)) : [];
        localStorage.setItem('aya_pengeluaran_v3', JSON.stringify(pengeluaran));
        renderPengeluaran();
        
        // Perbaikan: Sinkronisasi pembaruan laporan ketika ada data pengeluaran baru masuk
        updateLaporan();
    });
}

// --- FUNGSI MANAJEMEN TABS ---
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('text-pink-600', 'border-pink-600', 'border-b-2');
        btn.classList.add('text-gray-500');
    });

    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => btn.getAttribute('onclick').includes(tabId));
    if (activeBtn) {
        activeBtn.classList.remove('text-gray-500');
        activeBtn.classList.add('text-pink-600', 'border-pink-600', 'border-b-2');
    }

    if (tabId === 'tab-riwayat') renderRiwayat();
    if (tabId === 'tab-pengeluaran') renderPengeluaran();
    if (tabId === 'tab-laporan') updateLaporan();
}

// --- FUNGSI FORMAT MATA UANG & TANGGAL ---
function formatRupiah(angka) {
    return 'Rp ' + parseInt(angka).toLocaleString('id-ID');
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
    document.querySelectorAll('.kat-btn').forEach(btn => {
        btn.classList.remove('bg-pink-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    const activeKatBtn = Array.from(document.querySelectorAll('.kat-btn')).find(btn => btn.getAttribute('onclick').includes(kat));
    if (activeKatBtn) activeKatBtn.classList.replace('bg-gray-100', 'text-gray-700', 'bg-pink-600', 'text-white');
    renderMenu();
}

function renderMenu() {
    const container = document.getElementById('container-menu');
    if (!container) return;
    container.innerHTML = '';

    const filtered = menuList.filter(item => item.kategori === currentKategori);
    filtered.forEach(item => {
        const itemKeranjang = keranjang.find(k => k.id === item.id);
        const qty = itemKeranjang ? itemKeranjang.qty : 0;

        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between p-3';
        card.innerHTML = `
            <img src="${item.gambar}" alt="${item.nama}" class="w-full h-32 object-cover rounded-lg mb-2">
            <div>
                <h4 class="font-bold text-gray-800 text-sm line-clamp-2">${item.nama}</h4>
                <p class="text-pink-600 font-semibold text-sm mt-1">${formatRupiah(item.harga)}</p>
            </div>
            <div class="mt-3">
                ${qty === 0 ? 
                    `<button onclick="tambahKeKeranjang('${item.id}')" class="w-full bg-pink-50 text-pink-600 font-medium py-1.5 rounded-lg text-xs hover:bg-pink-100 transition">Tambah</button>` :
                    `<div class="flex items-center justify-between bg-pink-50 rounded-lg p-1">
                        <button onclick="kurangDariKeranjang('${item.id}')" class="w-7 h-7 bg-white text-pink-600 rounded-md font-bold text-xs shadow-sm flex items-center justify-center">-</button>
                        <span class="text-pink-700 font-bold text-sm">${qty}</span>
                        <button onclick="tambahKeKeranjang('${item.id}')" class="w-7 h-7 bg-white text-pink-600 rounded-md font-bold text-xs shadow-sm flex items-center justify-center">+</button>
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

function renderKeranjang() {
    const container = document.getElementById('item-keranjang');
    const totalBayarEl = document.getElementById('total-bayar');
    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    keranjang.forEach(item => {
        total += item.harga * item.qty;
        const subtotal = item.harga * item.qty;
        const row = document.createElement('div');
        row.className = 'flex justify-between items-center bg-gray-50 p-2.5 rounded-lg border border-gray-100';
        row.innerHTML = `
            <div>
                <h5 class="font-bold text-gray-800 text-xs">${item.nama}</h5>
                <p class="text-[11px] text-gray-500">${formatRupiah(item.harga)} x ${item.qty}</p>
            </div>
            <div class="text-right">
                <span class="font-bold text-gray-700 text-xs block">${formatRupiah(subtotal)}</span>
                <button onclick="hapusItemKeranjang('${item.id}')" class="text-[10px] text-red-500 hover:underline mt-0.5">Hapus</button>
            </div>
        `;
        container.appendChild(row);
    });

    if (totalBayarEl) totalBayarEl.innerText = formatRupiah(total);
}

function hapusItemKeranjang(id) {
    keranjang = keranjang.filter(k => k.id !== id);
    renderMenu();
    renderKeranjang();
}

function prosesTransaksi() {
    if (keranjang.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }

    const total = keranjang.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const idTrx = generateCustomId('TRX');
    
    const transaksiBaru = {
        id: idTrx,
        tanggal: new Date().toISOString(),
        items: keranjang,
        total: total
    };

    if (db) {
        db.ref('transaksi/' + idTrx).set(transaksiBaru)
            .then(() => resetSetelahTransaksi())
            .catch(err => alert('Gagal menyimpan ke Firebase: ' + err.message));
    } else {
        riwayatTransaksi.unshift(transaksiBaru);
        localStorage.setItem('aya_transaksi_v3', JSON.stringify(riwayatTransaksi));
        resetSetelahTransaksi();
    }
}

function resetSetelahTransaksi() {
    keranjang = [];
    renderKeranjang();
    filterKategori(currentKategori);
    alert('Transaksi Berhasil Disimpan!');
}

// --- FUNGSI HALAMAN RIWAYAT ---
function renderRiwayat() {
    const container = document.getElementById('list-riwayat');
    if (!container) return;
    container.innerHTML = '';

    if (riwayatTransaksi.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 py-8 text-sm">Belum ada riwayat transaksi.</p>';
        return;
    }

    riwayatTransaksi.forEach(trx => {
        const itemText = trx.items.map(i => `${i.nama} (${i.qty})`).join(', ');
        const tgl = new Date(trx.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        
        const card = document.createElement('div');
        card.className = 'bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex justify-between items-start';
        card.innerHTML = `
            <div class="space-y-1 max-w-[70%]">
                <span class="text-[11px] font-mono bg-pink-50 text-pink-600 px-2 py-0.5 rounded-md font-bold">${trx.id}</span>
                <p class="text-xs text-gray-400">${tgl}</p>
                <p class="text-xs text-gray-700 font-medium line-clamp-2 mt-1">${itemText}</p>
            </div>
            <div class="text-right flex flex-col items-end space-y-2">
                <span class="font-bold text-gray-800 text-sm">${formatRupiah(trx.total)}</span>
                <button onclick="hapusTransaksi('${trx.id}')" class="text-[10px] text-red-500 hover:bg-red-50 px-2 py-1 rounded transition border border-red-100">Hapus</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function hapusTransaksi(id) {
    if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) return;
    if (db) {
        db.ref('transaksi/' + id).remove()
            .catch(err => alert('Gagal menghapus data Firebase: ' + err.message));
    } else {
        riwayatTransaksi = riwayatTransaksi.filter(t => t.id !== id);
        localStorage.setItem('aya_transaksi_v3', JSON.stringify(riwayatTransaksi));
        renderRiwayat();
        updateLaporan();
    }
}

// --- FUNGSI HALAMAN PENGELUARAN ---
function tambahPengeluaran(e) {
    if(e) e.preventDefault();
    const nama = document.getElementById('out-nama').value;
    const jumlah = parseInt(document.getElementById('out-jumlah').value);
    
    if(!nama || !jumlah) return;

    const idOut = generateCustomId('OUT');
    const dataBaru = {
        id: idOut,
        tanggal: new Date().toISOString(),
        keterangan: nama,
        jumlah: jumlah
    };

    if (db) {
        db.ref('pengeluaran/' + idOut).set(dataBaru)
            .then(() => {
                document.getElementById('form-pengeluaran').reset();
                alert('Pengeluaran berhasil disimpan!');
            });
    } else {
        pengeluaran.unshift(dataBaru);
        localStorage.setItem('aya_pengeluaran_v3', JSON.stringify(pengeluaran));
        document.getElementById('form-pengeluaran').reset();
        renderPengeluaran();
        updateLaporan();
    }
}

function renderPengeluaran() {
    const container = document.getElementById('list-pengeluaran');
    if (!container) return;
    container.innerHTML = '';

    if (pengeluaran.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-400 py-8 text-sm">Belum ada catatan pengeluaran.</p>';
        return;
    }

    pengeluaran.forEach(out => {
        const tgl = new Date(out.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        const card = document.createElement('div');
        card.className = 'bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex justify-between items-center';
        card.innerHTML = `
            <div>
                <h5 class="font-bold text-gray-800 text-xs">${out.keterangan}</h5>
                <p class="text-[11px] text-gray-400">${tgl} · <span class="font-mono text-[10px]">${out.id}</span></p>
            </div>
            <div class="flex items-center space-x-3">
                <span class="font-bold text-red-600 text-sm">-${formatRupiah(out.jumlah)}</span>
                <button onclick="hapusPengeluaran('${out.id}')" class="text-gray-400 hover:text-red-500 text-xs">✕</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function hapusPengeluaran(id) {
    if (!confirm('Hapus catatan pengeluaran ini?')) return;
    if (db) {
        db.ref('pengeluaran/' + id).remove();
    } else {
        pengeluaran = pengeluaran.filter(o => o.id !== id);
        localStorage.setItem('aya_pengeluaran_v3', JSON.stringify(pengeluaran));
        renderPengeluaran();
        updateLaporan();
    }
}

// --- FUNGSI HALAMAN REKAP & GRAFIK (LAPORAN) ---
function updateLaporan() {
    let omset = 0;
    let totalOut = 0;
    const produkTerjual = {};

    // Hitung total omset dan pemetaan produk terjual
    riwayatTransaksi.forEach(trx => {
        omset += trx.total;
        trx.items.forEach(item => {
            produkTerjual[item.nama] = (produkTerjual[item.nama] || 0) + item.qty;
        });
    });

    // Hitung total pengeluaran
    pengeluaran.forEach(out => {
        totalOut += out.jumlah;
    });

    const labaRugi = omset - totalOut;

    // Masukkan data ke DOM HTML
    const omsetEl = document.getElementById('rep-omset');
    const pengeluaranEl = document.getElementById('rep-pengeluaran');
    const labaEl = document.getElementById('rep-laba');

    if (omsetEl) omsetEl.innerText = formatRupiah(omset);
    if (pengeluaranEl) pengeluaranEl.innerText = formatRupiah(totalOut);
    if (labaEl) {
        labaEl.innerText = formatRupiah(labaRugi);
        if (labaRugi >= 0) {
            labaEl.className = "text-xl font-bold text-emerald-600";
        } else {
            labaEl.className = "text-xl font-bold text-red-600";
        }
    }

    // Pembuatan Grafik Chart.js
    const ctx = document.getElementById('chartProdukLaku');
    if (!ctx) return;

    const sortedProduk = Object.entries(produkTerjual)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const labels = sortedProduk.map(p => p[0]);
    const dataValues = sortedProduk.map(p => p[1]);

    if (chartInstance) {
        chartInstance.destroy();
    }

    if(labels.length === 0) {
        ctx.style.display = 'none';
        const nodata = document.getElementById('no-chart-data') || document.createElement('p');
        nodata.id = 'no-chart-data';
        nodata.className = 'text-center text-gray-400 text-xs py-8';
        nodata.innerText = 'Belum ada data penjualan untuk dibuat grafik.';
        if(!document.getElementById('no-chart-data')) ctx.parentNode.appendChild(nodata);
        return;
    } else {
        ctx.style.display = 'block';
        const nodata = document.getElementById('no-chart-data');
        if(nodata) nodata.remove();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Qty Terjual',
                data: dataValues,
                backgroundColor: 'rgba(219, 39, 119, 0.2)',
                borderColor: 'rgba(219, 39, 119, 1)',
                borderWidth: 1.5,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: '#9CA3AF', font: { size: 10 } },
                    grid: { color: '#F3F4F6' }
                },
                x: {
                    ticks: { color: '#4B5563', font: { size: 10 } },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// --- PEMICU INISIALISASI PERTAMA KALI WEB DIMUAT ---
// Perbaikan: Memastikan DOM & database siap sebelum me-render data ke antarmuka aplikasi
document.addEventListener("DOMContentLoaded", () => {
    filterKategori('topping');
    renderPengeluaran();
    updateLaporan();
});