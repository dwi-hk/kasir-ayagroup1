// Konfigurasi Firebase Realtime Database Anda
const firebaseConfig = {
    apiKey: "AIzaSyCx0u4ka3lhjiPm84hI8U7v37GNusCvPaE",
    authDomain: "kasir-aya-group-e6fb4.firebaseapp.com",
    databaseURL: "https://kasir-aya-group-e6fb4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kasir-aya-group-e6fb4",
    storageBucket: "kasir-aya-group-e6fb4.firebasestorage.app",
    messagingSenderId: "654765768336",
    appId: "1:654765768336:web:7fb865aaf00e371de36215"
};

let db = null;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
} catch(e) { 
    console.error("Firebase tidak dapat terhubung atau diinisialisasi", e); 
}

// Database Menu Kasir AYA GROUP
const databaseMenu = [
    { id: 101, nama: "Kornet", harga: 1000, kategori: "topping" },
    { id: 102, nama: "Pentol", harga: 1000, kategori: "topping" },
    { id: 103, nama: "Sosis Kecil", harga: 1000, kategori: "topping" },
    { id: 104, nama: "Sosis Merah", harga: 1500, kategori: "topping" },
    { id: 105, nama: "Sosis Salju", harga: 2000, kategori: "topping" },
    { id: 106, nama: "Sosis Jumbo", harga: 5000, kategori: "topping" },
    { id: 107, nama: "Bintang", harga: 1000, kategori: "topping" },
    { id: 108, nama: "Tempura", harga: 1500, kategori: "topping" },
    { id: 109, nama: "Scallop", harga: 1000, kategori: "topping" },
    { id: 110, nama: "Bakso Ikan", harga: 1500, kategori: "topping" },
    { id: 111, nama: "Tahu Bakso", harga: 1000, kategori: "topping" },
    { id: 112, nama: "Dumpling Ayam", harga: 2000, kategori: "topping" },
    { id: 113, nama: "Dumpling Keju", harga: 2000, kategori: "topping" },
    { id: 114, nama: "Dumpling Spicy", harga: 2000, kategori: "topping" },
    { id: 115, nama: "Odeng", harga: 2000, kategori: "topping" },
    { id: 116, nama: "Cikua", harga: 1000, kategori: "topping" },
    { id: 117, nama: "Fish Roll", harga: 2000, kategori: "topping" },
    { id: 118, nama: "Crab Stik", harga: 2000, kategori: "topping" },
    { id: 119, nama: "Ekor Udang", harga: 2000, kategori: "topping" },
    { id: 120, nama: "Udang Gulung", harga: 2500, kategori: "topping" },
    { id: 121, nama: "Kembang Cumi", harga: 1000, kategori: "topping" },
    { id: 122, nama: "Pilus", harga: 1000, kategori: "topping" },
    { id: 123, nama: "Cuanki Lidah", harga: 2000, kategori: "topping" },
    { id: 124, nama: "Siomay Kering", harga: 2000, kategori: "topping" },
    { id: 125, nama: "Krupuk Rafael", harga: 1000, kategori: "topping" },
    { id: 126, nama: "Krupuk Orange", harga: 1000, kategori: "topping" },
    { id: 127, nama: "Krupuk Warna", harga: 1000, kategori: "topping" },
    { id: 128, nama: "Krupuk Bintang", harga: 1000, kategori: "topping" },
    { id: 129, nama: "Krupuk Tangga", harga: 1000, kategori: "topping" },
    { id: 130, nama: "Jamur Enoki", harga: 1000, kategori: "topping" },
    { id: 131, nama: "Mie lombok", harga: 1000, kategori: "topping" },

    { id: 201, nama: "Mie Tulang", harga: 8000, kategori: "makanan" },
    { id: 202, nama: "Gado gado", harga: 12000, kategori: "makanan" },
    { id: 203, nama: "Seblak All Varian", harga: 8000, kategori: "makanan" },
    { id: 204, nama: "Nasi Kucing", harga: 5000, kategori: "makanan" },
    { id: 205, nama: "Nasi Bakar", fontStyle: "", harga: 5000, kategori: "makanan" },
    { id: 206, nama: "Sayap bakar", harga: 5000, kategori: "makanan" },
    { id: 207, nama: "Kepala (Mulai)", harga: 3000, kategori: "makanan" },
    { id: 208, nama: "Ceker (Mulai)", harga: 2000, kategori: "makanan" },
    { id: 209, nama: "Tempe bacem", harga: 2000, kategori: "makanan" },
    { id: 210, nama: "Tahu bacem", harga: 2000, kategori: "makanan" },
    { id: 211, nama: "Telur puyuh bakar", harga: 3000, kategori: "makanan" },
    { id: 212, nama: "Sate Usus", harga: 3000, kategori: "makanan" },
    { id: 213, nama: "Sate Rempelo Ati", harga: 3000, kategori: "makanan" },
    { id: 214, nama: "Sate Lok Lok", harga: 3000, kategori: "makanan" },
    { id: 215, nama: "Sosis bakar", harga: 8000, kategori: "makanan" },

    { id: 301, nama: "Es Teh", harga: 4000, kategori: "dingin" },
    { id: 302, nama: "Es Dawet", harga: 5000, kategori: "dingin" },
    { id: 303, nama: "Es Teller", harga: 10000, kategori: "dingin" },
    { id: 304, nama: "Pop Ice", harga: 5000, kategori: "dingin" },
    { id: 305, nama: "Nutri sari Ice", harga: 5000, kategori: "dingin" },
    { id: 306, nama: "Milo ice", harga: 6000, kategori: "dingin" },
    { id: 307, nama: "Good Day ice", harga: 6000, kategori: "dingin" },
    { id: 308, nama: "Bonteh Matcha", harga: 5000, kategori: "dingin" },
    { id: 309, nama: "Bonteh Tarik", harga: 5000, kategori: "dingin" },
    { id: 310, nama: "Uyu Ice", harga: 5000, kategori: "dingin" },
    { id: 311, nama: "Beng Beng Ice", harga: 6000, kategori: "dingin" },
    { id: 312, nama: "Chocolatos Ice", harga: 6000, kategori: "dingin" },
    { id: 313, nama: "Kuku Bima Susu Ice", harga: 7000, kategori: "dingin" },
    { id: 314, nama: "Extra Jos Susu Ice", harga: 7000, kategori: "dingin" },
    { id: 315, nama: "Hemaviton Susu Ice", harga: 7000, kategori: "dingin" },
    { id: 316, nama: "Milk Ice", harga: 5000, kategori: "dingin" },
    { id: 317, nama: "Top Coffee Gula aren Ice", harga: 5000, kategori: "dingin" },

    { id: 401, nama: "Teh Hangat", harga: 4000, kategori: "panas" },
    { id: 402, nama: "Kopi Hitam Racik", harga: 5000, kategori: "panas" },
    { id: 403, nama: "Top Coffee Gula aren panas", harga: 6000, kategori: "panas" },
    { id: 404, nama: "Susu Jahe Panas", harga: 5000, kategori: "panas" },
    { id: 405, nama: "Top Kopi Susu", harga: 5000, kategori: "panas" },
    { id: 406, nama: "Kopi Susu Racik", harga: 6000, kategori: "panas" },
    { id: 407, nama: "Kopi Kapal Api", harga: 5000, kategori: "panas" },
    { id: 408, nama: "Top Kopi HItam", harga: 5000, kategori: "panas" },
    { id: 409, nama: "Kopi Brontoseno", harga: 5000, kategori: "panas" },
    { id: 410, nama: "Kopi Luwak Hitam", harga: 5000, kategori: "panas" },
    { id: 411, nama: "Luwak White Coffee", harga: 5000, kategori: "panas" },

    { id: 501, nama: "Roti Nolanda", harga: 3000, kategori: "jajanan" },
    { id: 502, nama: "Roti Sisir Bareto", harga: 3000, kategori: "jajanan" },
    { id: 503, nama: "Batagor Ikan (1 porsi)", harga: 5000, kategori: "jajanan" },
    { id: 504, nama: "Cimol", harga: 3000, kategori: "jajanan" },
    { id: 505, nama: "Surya (1 batang)", harga: 3000, kategori: "jajanan" }
];

// Status Aplikasi Utama
let keranjang = [];
let riwayatTransaksi = JSON.parse(localStorage.getItem('aya_transaksi_v3')) || [];
let pengeluaran = JSON.parse(localStorage.getItem('aya_pengeluaran_v3')) || [];
let kategoriAktif = 'topping';
let metodePembayaran = 'TUNAI';
let myChart = null;

let tanggalMulaiTerpilih = null;
let tanggalSelesaiTerpilih = null;
let tglPengeluaranMulai = null;
let tglPengeluaranSelesai = null;

const UANG_MODAL_HARIAN = 70000;

// Helper: Mengambil Tanggal Sesuai Zona Waktu Lokal YYYY-MM-DD
function dapatkanTanggalLokal() {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    const lokal = new Date(d.getTime() - (offset * 60 * 1000));
    return lokal.toISOString().split('T')[0];
}

// Sinkronisasi Firebase Realtime Database
if (db) {
    db.ref('transaksi').on('value', (snapshot) => {
        const data = snapshot.val();
        riwayatTransaksi = data ? Object.values(data).sort((a, b) => b.id.localeCompare(a.id)) : [];
        localStorage.setItem('aya_transaksi_v3', JSON.stringify(riwayatTransaksi));
        if(!document.getElementById('tab-laporan').classList.contains('hidden')) updateLaporan();
    });

    db.ref('pengeluaran').on('value', (snapshot) => {
        const data = snapshot.val();
        pengeluaran = data ? Object.values(data).sort((a, b) => b.id.localeCompare(a.id)) : [];
        localStorage.setItem('aya_pengeluaran_v3', JSON.stringify(pengeluaran));
        renderPengeluaran();
        if(!document.getElementById('tab-laporan').classList.contains('hidden')) updateLaporan();
    });
}

// Menampilkan grid tombol produk berdasarkan kategori
function renderMenu() {
    const container = document.getElementById('container-menu');
    container.innerHTML = '';
    const menuTerfilter = databaseMenu.filter(item => item.kategori === kategoriAktif);
    menuTerfilter.forEach(item => {
        container.innerHTML += `
            <button onclick="tambahItem(${item.id})" class="p-2 sm:p-3 bg-white hover:bg-orange-100 border-2 border-orange-200 rounded-xl text-left transition flex flex-col justify-between h-20 active:scale-95 shadow-sm cursor-pointer">
                <span class="font-bold text-[11px] sm:text-xs text-gray-700 uppercase tracking-tight line-clamp-2">${item.nama}</span>
                <span class="text-orange-600 font-extrabold text-xs sm:text-sm">Rp ${item.harga.toLocaleString('id-ID')}</span>
            </button>
        `;
    });
}

// Mengganti kategori menu aktif
function filterKategori(kategori) {
    kategoriAktif = kategori;
    ['topping', 'makanan', 'dingin', 'panas', 'jajanan'].forEach(kat => {
        const btn = document.getElementById('btn-kat-' + kat);
        if (btn) {
            btn.className = "px-4 py-2 font-bold text-xs sm:text-sm rounded-lg transition cursor-pointer whitespace-nowrap " + 
                            (kat === kategori ? "bg-orange-500 text-white shadow" : "bg-gray-100 text-gray-700");
        }
    });
    renderMenu();
}

// Mengubah tipe metode pembayaran belanja
function setMetodePembayaran(metode) {
    metodePembayaran = metode;
    let btnTunai = document.getElementById('btn-bayar-tunai');
    let btnQris = document.getElementById('btn-bayar-qris');
    let btnKonsumsi = document.getElementById('btn-bayar-konsumsi');
    let wrapBayar = document.getElementById('wrapperUangBayar');
    let wrapKembali = document.getElementById('wrapperKembalian');

    btnTunai.className = "py-2 text-center text-[10px] font-bold rounded-lg bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer transition";
    btnQris.className = "py-2 text-center text-[10px] font-bold rounded-lg bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer transition";
    btnKonsumsi.className = "py-2 text-center text-[10px] font-bold rounded-lg bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer transition";

    if (metode === 'TUNAI') {
        btnTunai.className = "py-2 text-center text-[10px] font-bold rounded-lg bg-orange-600 text-white shadow border border-orange-600 cursor-pointer transition";
        wrapBayar.classList.remove('hidden');
        wrapKembali.classList.remove('hidden');
    } else {
        let activeBtn = (metode === 'QRIS') ? btnQris : btnKonsumsi;
        activeBtn.className = "py-2 text-center text-[10px] font-bold rounded-lg bg-orange-600 text-white shadow border border-orange-600 cursor-pointer transition";
        wrapBayar.classList.add('hidden');
        wrapKembali.classList.add('hidden');
    }
    hitungKembalian();
}

// Menambah item ke keranjang
function tambahItem(id) {
    const produk = databaseMenu.find(p => p.id === id);
    const ada = keranjang.find(k => k.id === id);
    if (ada) {
        ada.qty += 1;
    } else {
        keranjang.push({ ...produk, qty: 1 });
    }
    updateKeranjang();
}

// Mengurangi/Menambah jumlah kuantitas item dalam list belanja
function ubahQty(id, delta) {
    const ada = keranjang.find(k => k.id !== undefined && k.id === id);
    if(ada) {
        ada.qty += delta;
        if(ada.qty <= 0) {
            keranjang = keranjang.filter(k => k.id !== id);
        }
    }
    updateKeranjang();
}

// Kalkulasi akumulasi hitungan pesanan + ongkir + biaya styrofoam manual
function hitungTotalKeseluruhan() {
    let totalBelanja = keranjang.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    if (keranjang.length === 0) return 0;

    let ongkir = parseInt(document.getElementById('inputOngkir').value) || 0;
    let qtyStyrofoam = parseInt(document.getElementById('inputStyrofoam').value) || 0;
    let biayaStyrofoam = qtyStyrofoam * 1000;

    return totalBelanja + ongkir + biayaStyrofoam;
}

// Update render data keranjang belanja di sisi kanan aplikasi
function updateKeranjang() {
    const container = document.getElementById('tabelKeranjang');
    if (keranjang.length === 0) {
        container.innerHTML = '<p class="text-gray-400 text-center py-4">Belum ada item dipilih</p>';
        document.getElementById('textTotal').innerText = 'Rp 0';
        hitungKembalian();
        return;
    }

    let html = '<div class="space-y-1.5">';
    keranjang.forEach(item => {
        let subtotal = item.harga * item.qty;
        html += `
            <div class="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-200">
                <div class="flex-1 min-w-0 pr-1">
                    <p class="font-bold text-[11px] text-gray-800 uppercase truncate">${item.nama}</p>
                    <p class="text-[10px] text-gray-500">Rp ${item.harga.toLocaleString('id-ID')}</p>
                </div>
                <div class="flex items-center gap-1">
                    <button onclick="ubahQty(${item.id}, -1)" class="w-5 h-5 bg-gray-200 rounded font-bold text-xs flex items-center justify-center text-gray-600 hover:bg-gray-300 cursor-pointer">-</button>
                    <span class="font-bold text-xs text-gray-800 px-1">${item.qty}</span>
                    <button onclick="ubahQty(${item.id}, 1)" class="w-5 h-5 bg-orange-500 text-white rounded font-bold text-xs flex items-center justify-center hover:bg-orange-600 cursor-pointer">+</button>
                </div>
                <span class="font-bold text-xs text-gray-700 w-16 text-right">Rp ${subtotal.toLocaleString('id-ID')}</span>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;

    let totalAkhir = hitungTotalKeseluruhan();
    document.getElementById('textTotal').innerText = 'Rp ' + totalAkhir.toLocaleString('id-ID');
    hitungKembalian();
}

// Mengukur nominal kembalian pembayaran tunai
function hitungKembalian() {
    let total = hitungTotalKeseluruhan();
    if (metodePembayaran === 'QRIS' || metodePembayaran === 'KONSUMSI') {
        document.getElementById('textKembalian').innerText = 'Rp 0';
        return;
    }
    let bayar = parseInt(document.getElementById('inputBayar').value) || 0;
    let kembalian = bayar - total;
    document.getElementById('textKembalian').innerText = kembalian >= 0 ? 'Rp ' + kembalian.toLocaleString('id-ID') : 'Uang Kurang';
}

// Mengosongkan keranjang kembali semula
function bersihkanKeranjang() {
    keranjang = [];
    document.getElementById('inputBayar').value = '';
    document.getElementById('inputOngkir').value = '';
    document.getElementById('inputStyrofoam').value = '';
    setMetodePembayaran('TUNAI');
    updateKeranjang();
}

// Proses Menyimpan Transaksi Ke Firebase/Localstorage
function simpanTransaksi() {
    if (keranjang.length === 0) { alert('Keranjang kosong!'); return false; }
    let total = hitungTotalKeseluruhan();
    let ongkir = parseInt(document.getElementById('inputOngkir').value) || 0;
    let qtyStyrofoam = parseInt(document.getElementById('inputStyrofoam').value) || 0;
    
    let bayar = total;
    let kembalian = 0;

    if (metodePembayaran === 'TUNAI') {
        bayar = parseInt(document.getElementById('inputBayar').value) || 0;
        if (bayar < total) { alert('Uang pembayaran Anda masih kurang!'); return false; }
        kembalian = bayar - total;
    }

    let idNota = 'NOTA-' + Date.now();
    let tglLokal = dapatkanTanggalLokal();
    let nota = {
        id: idNota,
        waktu: new Date().toLocaleString('id-ID'),
        tanggalISO: tglLokal,
        items: [...keranjang],
        total: total,
        bayar: bayar,
        kembalian: kembalian,
        metodePembayaran: metodePembayaran,
        ongkir: ongkir,
        qtyStyrofoam: qtyStyrofoam
    };

    if (db) {
        db.ref('transaksi/' + idNota).set(nota);
    } else {
        riwayatTransaksi.unshift(nota);
        localStorage.setItem('aya_transaksi_v3', JSON.stringify(riwayatTransaksi));
        updateLaporan();
    }
    return true;
}

function tombolSimpanSaja() {
    let sukses = simpanTransaksi();
    if(sukses) {
        alert('Sukses! Transaksi Berhasil Disimpan.');
        bersihkanKeranjang();
    }
}

// Mengisi element cetak nota thermal & memanggil fungsi cetak windows
function cetakNota() {
    if (keranjang.length === 0) return alert('Keranjang belanja masih kosong!');
    let total = hitungTotalKeseluruhan();
    let ongkir = parseInt(document.getElementById('inputOngkir').value) || 0;
    let qtyStyrofoam = parseInt(document.getElementById('inputStyrofoam').value) || 0;
    
    let bayar = total;
    if (metodePembayaran === 'TUNAI') {
        bayar = parseInt(document.getElementById('inputBayar').value) || 0;
        if (bayar < total) return alert('Input uang bayar dengan benar sebelum mencetak!');
    }

    document.getElementById('notaWaktu').innerHTML = `
        <div>Waktu: ${new Date().toLocaleString('id-ID')}</div>
        <div>No   : REG-${Date.now().toString().slice(-6)}</div>
    `;
    document.getElementById('notaMetode').innerHTML = `METODE PEMBAYARAN: ${metodePembayaran}`;
    
    let htmlItems = '';
    keranjang.forEach(item => {
        let subtotal = item.harga * item.qty;
        htmlItems += `
            <div class="flex justify-between font-bold text-gray-900"><span>${item.nama.toUpperCase()}</span></div>
            <div class="flex justify-between pl-2 text-[11px] text-gray-700"><span>  ${item.qty} x Rp ${item.harga.toLocaleString('id-ID')}</span><span>Rp ${subtotal.toLocaleString('id-ID')}</span></div>
        `;
    });
    
    if(qtyStyrofoam > 0) {
        let subtotalStyrofoam = qtyStyrofoam * 1000;
        htmlItems += `
            <div class="flex justify-between font-bold text-gray-900"><span>STYROFOAM</span></div>
            <div class="flex justify-between pl-2 text-[11px] text-gray-700"><span>  ${qtyStyrofoam} x Rp 1.000</span><span>Rp ${subtotalStyrofoam.toLocaleString('id-ID')}</span></div>
        `;
    }
    if(ongkir > 0) {
        htmlItems += `
            <div class="flex justify-between font-bold text-gray-900"><span>ONGKOS KIRIM</span></div>
            <div class="flex justify-between pl-2 text-[11px] text-gray-700"><span>  Manual Input</span><span>Rp ${ongkir.toLocaleString('id-ID')}</span></div>
        `;
    }

    document.getElementById('notaItems').innerHTML = htmlItems;
    
    document.getElementById('notaTotal').innerHTML = `
        <div class="flex justify-between font-bold text-[13px] mt-1"><span>TOTAL :</span><span>Rp ${total.toLocaleString('id-ID')}</span></div>
        <div class="flex justify-between text-gray-800"><span>BAYAR :</span><span>Rp ${bayar.toLocaleString('id-ID')}</span></div>
        <div class="flex justify-between text-gray-800 font-bold"><span>KEMBALI:</span><span>Rp ${(bayar - total).toLocaleString('id-ID')}</span></div>
    `;
    
    setTimeout(() => {
        window.print();
        let sukses = simpanTransaksi();
        if(sukses) {
            bersihkanKeranjang();
        }
    }, 300);
}

// Mencatat data pengeluaran operasional baru
function simpanPengeluaran() {
    let nama = document.getElementById('namaPengeluaran').value;
    let biaya = parseInt(document.getElementById('biayaPengeluaran').value) || 0;
    if(!nama || biaya <= 0) return alert('Silakan masukkan nama barang & harga yang benar!');

    let idPengeluaran = 'EXP-' + Date.now();
    let tglLokal = dapatkanTanggalLokal();
    let dataPengeluaran = { 
        id: idPengeluaran,
        nama: nama, 
        biaya: biaya, 
        waktu: new Date().toLocaleString('id-ID'),
        tanggalISO: tglLokal
    };

    if (db) {
        db.ref('pengeluaran/' + idPengeluaran).set(dataPengeluaran);
    } else {
        pengeluaran.unshift(dataPengeluaran);
        localStorage.setItem('aya_pengeluaran_v3', JSON.stringify(pengeluaran));
        renderPengeluaran();
        updateLaporan();
    }

    document.getElementById('namaPengeluaran').value = '';
    document.getElementById('biayaPengeluaran').value = '';
    alert('Pengeluaran berhasil dicatat!');
}

// Menampilkan list data rekap pengeluaran operasional di tab Pengeluaran
function renderPengeluaran() {
    let container = document.getElementById('listPengeluaran');
    let hariIniISO = dapatkanTanggalLokal();

    let pengeluaranTerfilter = pengeluaran.filter(p => {
        if (tglPengeluaranMulai && tglPengeluaranSelesai) {
            return p.tanggalISO >= tglPengeluaranMulai && p.tanggalISO <= tglPengeluaranSelesai;
        }
        return p.tanggalISO === hariIniISO;
    });

    pengeluaranTerfilter.sort((a, b) => b.id.localeCompare(a.id));

    container.innerHTML = pengeluaranTerfilter.length === 0 ? '<p class="text-gray-400 py-2 text-center text-xs">Tidak ada pengeluaran pada periode ini</p>' : '';
    pengeluaranTerfilter.forEach(p => {
        container.innerHTML += `<div class="flex justify-between py-1.5 text-gray-700 border-b border-gray-100"><span>📌 ${p.nama} <br><small class="text-gray-400">${p.waktu}</small></span><span class="font-bold text-red-500">Rp ${p.biaya.toLocaleString('id-ID')}</span></div>`;
    });
}

// Memasukkan tambahan modal kas fisik riil (diluar omset penjualan bisnis)
function simpanModalTambahan() {
    let nominal = parseInt(document.getElementById('inputModalTambahan').value) || 0;
    if (nominal <= 0) return alert('Silakan masukkan nominal modal tambahan yang valid!');

    let idNota = 'NOTA-MODAL-' + Date.now();
    let tglLokal = dapatkanTanggalLokal();
    let dataModalSebagaiPemasukan = {
        id: idNota,
        waktu: new Date().toLocaleString('id-ID'),
        tanggalISO: tglLokal,
        items: [{ id: 999, nama: "TAMBAHAN MODAL CASH", harga: nominal, qty: 1, kategori: "modal" }],
        total: nominal,
        bayar: nominal,
        kembalian: 0,
        metodePembayaran: 'MODAL_MASUK',
        ongkir: 0,
        qtyStyrofoam: 0
    };

    if (db) {
        db.ref('transaksi/' + idNota).set(dataModalSebagaiPemasukan);
    } else {
        riwayatTransaksi.unshift(dataModalSebagaiPemasukan);
        localStorage.setItem('aya_transaksi_v3', JSON.stringify(riwayatTransaksi));
        updateLaporan();
    }

    document.getElementById('inputModalTambahan').value = '';
    alert('Tambahan modal berhasil disimpan langsung ke dalam Kas Pemasukan!');
}

function terapkanFilterTanggal() {
    let mulai = document.getElementById('filterTanggalMulai').value;
    let selesai = document.getElementById('filterTanggalSelesai').value;
    if(!mulai || !selesai) return alert('Silakan pilih rentang tanggal mulai dan selesai!');
    tanggalMulaiTerpilih = mulai;
    tanggalSelesaiTerpilih = selesai;
    updateLaporan();
}

function resetFilterTanggal() {
    document.getElementById('filterTanggalMulai').value = '';
    document.getElementById('filterTanggalSelesai').value = '';
    tanggalMulaiTerpilih = null;
    tanggalSelesaiTerpilih = null;
    updateLaporan();
}

function hitungHariUnik(transaksi, pengeluaran) {
    let setHari = new Set();
    transaksi.forEach(n => setHari.add(n.tanggalISO));
    pengeluaran.forEach(p => setHari.add(p.tanggalISO));
    return setHari.size || 1;
}

function terapkanFilterPengeluaran() {
    let mulai = document.getElementById('filterPengeluaranMulai').value;
    let selesai = document.getElementById('filterPengeluaranSelesai').value;
    if(!mulai || !selesai) return alert('Silakan pilih rentang tanggal mulai dan selesai!');
    tglPengeluaranMulai = mulai;
    tglPengeluaranSelesai = selesai;
    renderPengeluaran();
}

function resetFilterPengeluaran() {
    document.getElementById('filterPengeluaranMulai').value = '';
    document.getElementById('filterPengeluaranSelesai').value = '';
    tglPengeluaranMulai = null;
    tglPengeluaranSelesai = null;
    renderPengeluaran();
}

// Memproses kalkulasi seluruh statistik dashboard rekap laba-rugi & grafik chart
function updateLaporan() {
    let hariIniISO = dapatkanTanggalLokal();

    let transaksiTerfilter = riwayatTransaksi.filter(n => {
        if (tanggalMulaiTerpilih && tanggalSelesaiTerpilih) {
            return n.tanggalISO >= tanggalMulaiTerpilih && n.tanggalISO <= tanggalSelesaiTerpilih;
        }
        return n.tanggalISO === hariIniISO;
    });

    let pengeluaranTerfilter = pengeluaran.filter(p => {
        if (tanggalMulaiTerpilih && tanggalSelesaiTerpilih) {
            return p.tanggalISO >= tanggalMulaiTerpilih && p.tanggalISO <= tanggalSelesaiTerpilih;
        }
        return p.tanggalISO === hariIniISO;
    });

    transaksiTerfilter.sort((a, b) => b.id.localeCompare(a.id));
    pengeluaranTerfilter.sort((a, b) => b.id.localeCompare(a.id));

    let omsetTunai = 0, omsetQris = 0, omsetKonsumsi = 0, omsetModalMasuk = 0;

    transaksiTerfilter.forEach(n => {
        if (n.metodePembayaran === 'QRIS') { omsetQris += n.total; } 
        else if (n.metodePembayaran === 'KONSUMSI') { omsetKonsumsi += n.total; } 
        else if (n.metodePembayaran === 'MODAL_MASUK') { omsetModalMasuk += n.total; } 
        else { omsetTunai += n.total; }
    });

    let omsetBisnisTotal = omsetTunai + omsetQris;
    let jumlahHari = hitungHariUnik(transaksiTerfilter, pengeluaranTerfilter);
    let totalModalPeriode = UANG_MODAL_HARIAN * jumlahHari;
    let totalBeban = pengeluaranTerfilter.reduce((sum, p) => sum + p.biaya, 0);
    
    let labaRugiBersih = omsetBisnisTotal - totalBeban;
    let totalUangCashFisik = totalModalPeriode + omsetModalMasuk + omsetTunai - totalBeban;

    // Render Data Statistik Card
    document.getElementById('statOmset').innerText = 'Rp ' + omsetBisnisTotal.toLocaleString('id-ID');
    document.getElementById('statOmsetTunai').innerText = 'Rp ' + omsetTunai.toLocaleString('id-ID');
    document.getElementById('statOmsetQris').innerText = 'Rp ' + omsetQris.toLocaleString('id-ID');
    document.getElementById('statOmsetModalMasuk').innerText = 'Rp ' + omsetModalMasuk.toLocaleString('id-ID');
    document.getElementById('statOmsetKonsumsi').innerText = 'Rp ' + omsetKonsumsi.toLocaleString('id-ID');
    document.getElementById('statPengeluaran').innerText = 'Rp ' + totalBeban.toLocaleString('id-ID');
    document.getElementById('statNota').innerText = transaksiTerfilter.length + ' Item';

    document.getElementById('statUangCash').innerText = 'Rp ' + totalUangCashFisik.toLocaleString('id-ID');
    document.getElementById('statModal').innerText = 'Rp ' + totalModalPeriode.toLocaleString('id-ID');
    document.getElementById('statModalTambahan').innerText = 'Rp ' + omsetModalMasuk.toLocaleString('id-ID');
    document.getElementById('statCashMasuk').innerText = 'Rp ' + omsetTunai.toLocaleString('id-ID');
    document.getElementById('statBebanCash').innerText = 'Rp ' + totalBeban.toLocaleString('id-ID');

    const elBox = document.getElementById('boxLabaRugi');
    const elLabel = document.getElementById('labelLabaRugi');
    const elStat = document.getElementById('statLabaRugi');

    if (labaRugiBersih >= 0) {
        elLabel.innerText = "📈 LABA BERSIH PENJUALAN";
        elStat.innerText = 'Rp ' + labaRugiBersih.toLocaleString('id-ID');
        elBox.className = "p-4 rounded-xl shadow border bg-emerald-50 border-emerald-200 text-emerald-700 flex flex-col justify-between";
    } else {
        elLabel.innerText = "📉 RUGI BERSIH";
        elStat.innerText = '- Rp ' + Math.abs(labaRugiBersih).toLocaleString('id-ID');
        elBox.className = "p-4 rounded-xl shadow border bg-red-50 border-red-200 text-red-700 flex flex-col justify-between";
    }

    // Render Pengeluaran Detail pada Tab Rekap
    let containerRekapPengeluaran = document.getElementById('rekapPengeluaranDetail');
    containerRekapPengeluaran.innerHTML = pengeluaranTerfilter.length === 0 ? '<p class="text-gray-400">Tidak ada pengeluaran pada periode ini</p>' : '';
    pengeluaranTerfilter.forEach(p => {
        containerRekapPengeluaran.innerHTML += `
            <div class="flex justify-between items-center p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
                <div>
                    <p class="font-bold text-gray-800 uppercase">📌 ${p.nama}</p>
                    <p class="text-[10px] text-gray-400">🕒 ${p.waktu}</p>
                </div>
                <span class="font-extrabold text-red-600">Rp ${p.biaya.toLocaleString('id-ID')}</span>
            </div>
        `;
    });

    // Render List Riwayat Nota Pemasukan Lengkap
    let containerNota = document.getElementById('riwayatNota');
    containerNota.innerHTML = transaksiTerfilter.length === 0 ? '<p class="text-gray-400">Tidak ada riwayat pada periode ini</p>' : '';
    
    transaksiTerfilter.forEach(n => {
        let badgeColor = 'bg-green-100 text-green-800';
        if (n.metodePembayaran === 'QRIS') badgeColor = 'bg-blue-100 text-blue-800';
        if (n.metodePembayaran === 'KONSUMSI') badgeColor = 'bg-purple-100 text-purple-800';
        if (n.metodePembayaran === 'MODAL_MASUK') badgeColor = 'bg-teal-600 text-white font-black';
        
        let badgeMetode = n.metodePembayaran === 'MODAL_MASUK' ? 'MODAL MASUK' : (n.metodePembayaran || 'TUNAI');

        let detailItemsHtml = `
            <div class="mt-3 border-t border-gray-200 pt-2 text-[11px] text-gray-700">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="text-gray-400 uppercase text-[9px] tracking-wider border-b border-gray-100">
                            <th class="pb-1 font-semibold">Nama Item</th>
                            <th class="pb-1 text-center font-semibold">Harga</th>
                            <th class="pb-1 text-center font-semibold">Qty</th>
                            <th class="pb-1 text-right font-semibold">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100/50">
        `;

        if (n.items && n.items.length > 0) {
            n.items.forEach(i => {
                let sub = i.harga * i.qty;
                detailItemsHtml += `
                    <tr>
                        <td class="py-1 font-medium text-gray-800">${i.nama}</td>
                        <td class="py-1 text-center text-gray-500">Rp ${i.harga.toLocaleString('id-ID')}</td>
                        <td class="py-1 text-center font-bold text-gray-600">${i.qty}x</td>
                        <td class="py-1 text-right font-bold text-gray-800">Rp ${sub.toLocaleString('id-ID')}</td>
                    </tr>
                `;
            });
        }

        if (n.qtyStyrofoam > 0) {
            let subtotalBungkus = n.qtyStyrofoam * 1000;
            detailItemsHtml += `
                <tr class="text-gray-500 italic">
                    <td class="py-1">📦 Styrofoam</td>
                    <td class="py-1 text-center">Rp 1.000</td>
                    <td class="py-1 text-center">${n.qtyStyrofoam}x</td>
                    <td class="py-1 text-right">Rp ${subtotalBungkus.toLocaleString('id-ID')}</td>
                </tr>
            `;
        }

        if (n.ongkir > 0) {
            detailItemsHtml += `
                <tr class="text-gray-500 italic">
                    <td class="py-1">🛵 Ongkos Kirim</td>
                    <td class="py-1 text-center">-</td>
                    <td class="py-1 text-center">-</td>
                    <td class="py-1 text-right">Rp ${n.ongkir.toLocaleString('id-ID')}</td>
                </tr>
            `;
        }

        detailItemsHtml += `</tbody></table></div>`;

        containerNota.innerHTML += `
            <div class="p-4 bg-white rounded-xl border border-orange-100 shadow-sm text-xs text-gray-600">
                <div class="flex justify-between items-center font-bold text-gray-800 mb-1">
                    <span class="text-sm">🧾 ${n.id} <span class="ml-2 px-2 py-0.5 text-[10px] rounded-md ${badgeColor}">${badgeMetode}</span></span>
                    <span class="text-emerald-600 text-base font-extrabold">Rp ${n.total.toLocaleString('id-ID')}</span>
                </div>
                <p class="text-gray-400 text-[10px]">📅 ${n.waktu}</p>
                ${detailItemsHtml}
            </div>
        `;
    });

    // Kalkulasi Data Grafik Chart Terlaris
    let produkCounts = {};
    transaksiTerfilter.forEach(n => {
        if(n.metodePembayaran !== 'MODAL_MASUK') { 
            n.items.forEach(i => { produkCounts[i.nama] = (produkCounts[i.nama] || 0) + i.qty; });
        }
    });
    let urutProduk = Object.keys(produkCounts).map(name => ({ name, qty: produkCounts[name] })).sort((a,b) => b.qty - a.qty).slice(0, 5);

    if (myChart) myChart.destroy();
    const ctx = document.getElementById('chartProdukLaku').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: urutProduk.map(p => p.name),
            datasets: [{
                label: 'Total Terjual',
                data: urutProduk.map(p => p.qty),
                backgroundColor: '#ea580c',
                borderWidth: 0
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
}

// Navigasi Tab Menu Utama Kasir
function switchTab(tab) {
    document.getElementById('tab-kasir').classList.add('hidden');
    document.getElementById('tab-pengeluaran').classList.add('hidden');
    document.getElementById('tab-laporan').classList.add('hidden');
    document.getElementById('tab-' + tab).classList.remove('hidden');
    if(tab === 'laporan') updateLaporan();
}

// Pemicu Inisialisasi Pertama Kali Web Dimuat
filterKategori('topping');
renderPengeluaran();