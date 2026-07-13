<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kasir AYA GROUP (Firebase Realtime & Multi-Payment)</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* Desain struk belanja khusus cetak printer thermal */
        @media print {
            body * { visibility: hidden; }
            #areaNota, #areaNota * { visibility: visible; }
            #areaNota { 
                position: absolute; \r
                left: 0; 
                top: 0; 
                width: 100%; 
                font-family: monospace; 
                color: #000;
            }
        }
    </style>
</head>
<body class="bg-orange-50 font-sans text-gray-800 min-h-screen flex flex-col">

    <header class="bg-orange-600 text-white p-4 shadow-md sticky top-0 z-50 flex justify-between items-center flex-wrap gap-2">
        <h1 class="text-2xl font-bold tracking-wider">🍊 AYA GROUP KASIR</h1>
        <div class="space-x-1 sm:space-x-2">
            <button onclick="switchTab('kasir')" class="px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-800 text-white rounded font-semibold text-xs sm:text-sm hover:bg-orange-900 transition cursor-pointer">🛒 Kasir</button>
            <button onclick="switchTab('pengeluaran')" class="px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-700 text-white rounded font-semibold text-xs sm:text-sm hover:bg-orange-800 transition cursor-pointer">💸 Pengeluaran</button>
            <button onclick="switchTab('laporan')" class="px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-700 text-white rounded font-semibold text-xs sm:text-sm hover:bg-orange-800 transition cursor-pointer">📊 Laporan Rekap</button>
        </div>
    </header>

    <main class="flex-1 p-3 sm:p-6 container mx-auto max-w-7xl">
        
        <div id="tab-kasir" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div class="lg:col-span-7 flex flex-col space-y-4">
                <div class="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
                    <button id="btn-kat-topping" onclick="filterKategori('topping')" class="px-4 py-2 bg-orange-500 text-white font-bold text-xs sm:text-sm rounded-lg shadow transition cursor-pointer whitespace-nowrap">Topping</button>
                    <button id="btn-kat-makanan" onclick="filterKategori('makanan')" class="px-4 py-2 bg-white text-gray-700 font-bold text-xs sm:text-sm rounded-lg border border-gray-200 transition cursor-pointer whitespace-nowrap">Makanan / Bakaran</button>
                    <button id="btn-kat-dingin" onclick="filterKategori('dingin')" class="px-4 py-2 bg-white text-gray-700 font-bold text-xs sm:text-sm rounded-lg border border-gray-200 transition cursor-pointer whitespace-nowrap">Minuman Dingin</button>
                    <button id="btn-kat-panas" onclick="filterKategori('panas')" class="px-4 py-2 bg-white text-gray-700 font-bold text-xs sm:text-sm rounded-lg border border-gray-200 transition cursor-pointer whitespace-nowrap">Minuman Hangat</button>
                    <button id="btn-kat-jajanan" onclick="filterKategori('jajanan')" class="px-4 py-2 bg-white text-gray-700 font-bold text-xs sm:text-sm rounded-lg border border-gray-200 transition cursor-pointer whitespace-nowrap">Jajanan / Rokok</button>
                </div>
                <div id="container-menu" class="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    </div>
            </div>

            <div class="lg:col-span-5 bg-white p-4 rounded-2xl shadow border border-orange-100 flex flex-col h-[fit-content] space-y-4">
                <div class="border-b pb-2 flex justify-between items-center">
                    <h3 class="font-bold text-gray-700 flex items-center gap-1 text-sm sm:text-base">📋 Detail Pesanan Belanja</h3>
                    <button onclick="bersihkanKeranjang()" class="text-xs text-red-500 hover:underline cursor-pointer">Kosongkan</button>
                </div>
                <div id="tabelKeranjang" class="space-y-3 max-h-[35vh] overflow-y-auto pr-1">
                    </div>

                <div class="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-2 text-xs sm:text-sm">
                    <div class="flex justify-between items-center">
                        <label class="text-gray-600 font-medium">Tambah Styrofoam (Pcs)</label>
                        <input type="number" id="inputStyrofoam" oninput="updateKeranjang()" min="0" placeholder="0" class="w-20 p-1 border rounded bg-white text-center">
                    </div>
                    <div class="flex justify-between items-center">
                        <label class="text-gray-600 font-medium">Nominal Ongkir Jasa</label>
                        <input type="number" id="inputOngkir" oninput="updateKeranjang()" min="0" placeholder="0" class="w-24 p-1 border rounded bg-white text-right">
                    </div>
                    <div class="border-t my-2 pt-2">
                        <label class="text-gray-600 font-medium block mb-1">Pilih Metode Pembayaran Opsi:</label>
                        <div class="grid grid-cols-3 gap-2">
                            <button id="btn-bayar-tunai" onclick="setMetodePembayaran('TUNAI')" class="py-2 text-center text-[10px] font-bold rounded-lg bg-orange-600 text-white shadow border border-orange-600 cursor-pointer transition">TUNAI</button>
                            <button id="btn-bayar-qris" onclick="setMetodePembayaran('QRIS')" class="py-2 text-center text-[10px] font-bold rounded-lg bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer transition">QRIS</button>
                            <button id="btn-bayar-konsumsi" onclick="setMetodePembayaran('KONSUMSI')" class="py-2 text-center text-[10px] font-bold rounded-lg bg-gray-100 text-gray-700 border border-gray-200 cursor-pointer transition">KONSUMSI</button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center pt-1">
                        <label class="text-gray-600 font-medium">Uang Diterima Pelanggan</label>
                        <input type="number" id="inputBayar" oninput="hitungKembalian()" placeholder="0" class="w-28 p-1 border rounded bg-white text-right font-bold text-gray-800">
                    </div>
                </div>

                <div class="pt-2 border-t space-y-1">
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-gray-600 font-semibold">Total Akhir Tagihan:</span>
                        <span id="textTotal" class="text-2xl font-extrabold text-orange-600">Rp 0</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-500 font-medium">Uang Kembalian Kasir:</span>
                        <span id="textKembalian" class="text-sm font-bold text-emerald-600">Rp 0</span>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3 pt-2">
                    <button onclick="tombolSimpanSaja()" class="py-3 bg-gray-800 text-white font-bold rounded-xl text-xs sm:text-sm hover:bg-gray-900 shadow transition cursor-pointer">💾 Simpan Transaksi</button>
                    <button onclick="tombolCetakStruk()" class="py-3 bg-orange-600 text-white font-bold rounded-xl text-xs sm:text-sm hover:bg-orange-700 shadow transition cursor-pointer">🖨️ Simpan & Cetak</button>
                </div>
            </div>
        </div>

        <div id="tab-pengeluaran" class="hidden max-w-2xl mx-auto bg-white p-5 rounded-2xl shadow border border-orange-100 space-y-6">
            <h2 class="text-lg font-bold text-gray-700 border-b pb-2 flex items-center gap-1">💸 Catat Pengeluaran Operasional Harian</h2>
            <form id="form-pengeluaran" onsubmit="event.preventDefault();" class="space-y-4">
                <div>
                    <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Nama / Keterangan Pengeluaran</label>
                    <input type="text" id="namaPengeluaran" required placeholder="Contoh: Beli es batu, isi ulang gas LPG, cup plasik" class="w-full p-2.5 border rounded-lg bg-gray-50">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-gray-600 uppercase mb-1">Total Biaya Pengeluaran (Rp)</label>
                    <input type="number" id="biayaPengeluaran" required placeholder="0" class="w-full p-2.5 border rounded-lg bg-gray-50">
                </div>
                <button onclick="simpanPengeluaran()" class="w-full py-2.5 bg-orange-600 text-white font-bold rounded-lg shadow hover:bg-orange-700 transition cursor-pointer">Simpan Pengeluaran</button>
            </form>
            <div class="border-t pt-4">
                <h3 class="font-bold text-gray-700 text-sm mb-3">📋 Riwayat Pengeluaran Hari Ini</h3>
                <div id="listPengeluaran" class="divide-y max-h-[40vh] overflow-y-auto">
                    </div>
            </div>
        </div>

        <div id="tab-laporan" class="hidden space-y-6">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div class="p-4 bg-white rounded-xl shadow border border-orange-100 flex flex-col justify-between">
                    <span class="text-xs font-semibold text-gray-400 uppercase">Omset Kotor</span>
                    <span id="statOmset" class="text-xl font-extrabold text-orange-600 mt-2">Rp 0</span>
                </div>
                <div class="p-4 bg-white rounded-xl shadow border border-orange-100 flex flex-col justify-between">
                    <span class="text-xs font-semibold text-gray-400 uppercase">Pengeluaran</span>
                    <span id="statPengeluaran" class="text-xl font-extrabold text-red-500 mt-2">Rp 0</span>
                </div>
                <div id="boxLabaRugi" class="p-4 bg-white rounded-xl shadow border border-orange-100 flex flex-col justify-between">
                    <span class="text-xs font-semibold text-gray-400 uppercase">Laba Bersih Toko</span>
                    <span id="statLabaRugi" class="text-xl font-extrabold text-emerald-600 mt-2">Rp 0</span>
                </div>
                <div class="p-4 bg-white rounded-xl shadow border border-orange-100 flex flex-col justify-between">
                    <span class="text-xs font-semibold text-gray-400 uppercase">Total Transaksi</span>
                    <span id="statNota" class="text-xl font-extrabold text-gray-800 mt-2">0 Nota</span>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="p-4 bg-orange-600 text-white rounded-xl shadow space-y-1">
                    <h4 class="text-xs font-bold uppercase tracking-wider opacity-90">💰 Total Kas Fisik (Uang Tunai)</h4>
                    <p id="statCashMasuk" class="text-lg font-black">Rp 0</p>
                    <div class="text-[10px] opacity-75 pt-1 border-t border-orange-500">
                        Beban Cash: <span id="statBebanCash">Rp 0</span><br>
                        Estimasi di Laci: <span id="statUangCash" class="font-bold underline">Rp 0</span>
                    </div>
                </div>
                <div class="p-4 bg-white rounded-xl shadow border border-orange-100 space-y-1">
                    <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider">📱 Pemasukan Dompet QRIS</h4>
                    <p id="statOmsetQris" class="text-lg font-extrabold text-gray-800">Rp 0</p>
                    <span class="text-[10px] text-gray-400 block border-t pt-1">Langsung masuk ke rekening bank utama</span>
                </div>
                <div class="p-4 bg-white rounded-xl shadow border border-orange-100 space-y-1">
                    <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider">🍪 Konsumsi Pribadi / Owner</h4>
                    <p id="statOmsetKonsumsi" class="text-lg font-extrabold text-gray-800">Rp 0</p>
                    <span class="text-[10px] text-gray-400 block border-t pt-1">Pengambilan stok produk internal</span>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div class="lg:col-span-7 bg-white p-4 rounded-2xl shadow border border-orange-100 flex flex-col h-72">
                    <h3 class="font-bold text-gray-700 text-sm mb-2">📊 Top 5 Produk Paling Laku (Terjual)</h3>
                    <div class="flex-1 relative">
                        <canvas id="chartProdukLaku"></canvas>
                    </div>
                </div>
                <div class="lg:col-span-5 bg-white p-4 rounded-2xl shadow border border-orange-100">
                    <h3 class="font-bold text-gray-700 text-sm mb-3">📜 Daftar Riwayat Transaksi Ringkas</h3>
                    <div id="riwayatNota" class="space-y-2.5 max-h-[45vh] overflow-y-auto pr-1">
                        </div>
                </div>
            </div>
            <div class="bg-white p-4 rounded-2xl shadow border border-orange-100">
                <h3 class="font-bold text-gray-700 text-sm mb-3">💸 Rincian Pengeluaran Finansial</h3>
                <div id="rekapPengeluaranDetail" class="space-y-2 max-h-[30vh] overflow-y-auto">
                    </div>
            </div>
        </div>

    </main>

    <div id="areaNota" class="hidden p-2 text-[12px] font-mono w-64 bg-white text-black leading-tight">
        <div class="text-center font-bold text-[14px]">AYA GROUP</div>
        <div class="text-center text-[10px]">Pusat Kuliner Terbaik</div>
        <div class="text-center my-1">--------------------------------</div>
        <div id="notaWaktu" class="text-[10px]"></div>
        <div id="notaMetode" class="text-[11px] font-bold"></div>
        <div class="text-center my-1">--------------------------------</div>
        <div id="notaItems" class="space-y-1"></div>
        <div class="text-center my-1">--------------------------------</div>
        <div id="notaTotal" class="space-y-0.5"></div>
        <div class="text-center my-1">--------------------------------</div>
        <div class="text-center mt-3 text-[10px] font-bold">Terima Kasih!<br>Selamat Menikmati Hidangan Kami</div>
    </div>

    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-database.js"></script>
    
    <script src="js/app.js"></script>
</body>
</html>