/**
 * SiTamu Store - State Management & Mock Database
 * Aplikasi Buku Tamu Digital (SiTamu) - Disperindag Prov. Jatim
 * Pure HTML/CSS/JS + Bootstrap 5 + localStorage
 */

const SITAMU_STORAGE_KEY = 'sitamu_database_v2';
const SITAMU_SESSION_KEY = 'sitamu_active_session';

const SiTamuSeed = {
    locations: [
        {
            id: 'LOC-01',
            name: 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim',
            address: 'Jl. Siwalankerto No. 4-6, Wonocolo, Surabaya, Jawa Timur 60236',
            status: 'Aktif',
            code: 'DPS-JTM'
        },
        {
            id: 'LOC-02',
            name: 'UPT Perlindungan Konsumen & Metrologi Legal Surabaya',
            address: 'Jl. Menur No. 31-C, Manyar Sabrangan, Mulyorejo, Surabaya',
            status: 'Aktif',
            code: 'UPT-METRO'
        },
        {
            id: 'LOC-03',
            name: 'UPT Pengembangan Mutu Produk Industri & Teknologi Kreatif',
            address: 'Jl. Pagesangan II No. 12, Surabaya',
            status: 'Aktif',
            code: 'UPT-MUTU'
        }
    ],

    qr_codes: [
        {
            id: 'QR-001',
            token: 'QR-DISPERINDAG-LOBBY-UTAMA',
            label: 'Lobby Utama (Pintu Masuk Depan Gedung A)',
            locationId: 'LOC-01',
            locationName: 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim',
            status: 'Aktif',
            createdAt: '2026-10-01T08:00:00.000Z',
            scanCount: 142
        },
        {
            id: 'QR-002',
            token: 'QR-DISPERINDAG-PINTU-TIMUR',
            label: 'Pintu Masuk Sayap Timur (Gedung B)',
            locationId: 'LOC-01',
            locationName: 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim',
            status: 'Aktif',
            createdAt: '2026-10-05T09:30:00.000Z',
            scanCount: 58
        },
        {
            id: 'QR-003',
            token: 'QR-UPT-METROLOGI-LOBBY',
            label: 'Lobby Pelayanan UPT Metrologi Legal',
            locationId: 'LOC-02',
            locationName: 'UPT Perlindungan Konsumen & Metrologi Legal Surabaya',
            status: 'Aktif',
            createdAt: '2026-10-02T08:15:00.000Z',
            scanCount: 89
        }
    ],

    categories: [
        {
            id: 'CAT-PLN',
            code: 'PLN',
            name: 'Konsultasi Perdagangan Luar Negeri (Ekspor & Impor)',
            bidang: 'Bidang Perdagangan Luar Negeri',
            placeholder: 'Contoh: Ingin konsultasi persyaratan ekspor produk makanan olahan ke Jepang & penerbitan SKA...',
            defaultPicRole: 'pic-1'
        },
        {
            id: 'CAT-PDN',
            code: 'PDN',
            name: 'Informasi & Izin Usaha Perdagangan Dalam Negeri',
            bidang: 'Bidang Perdagangan Dalam Negeri',
            placeholder: 'Contoh: Konsultasi mengenai izin pameran dagang regional dan stabilisasi pasokan pangan...',
            defaultPicRole: 'pic-2'
        },
        {
            id: 'CAT-IND',
            code: 'IND',
            name: 'Fasilitasi Industri, TKDN & Sertifikasi Halal IKM',
            bidang: 'Bidang Pembangunan Sumber Daya Industri',
            placeholder: 'Contoh: Ingin mengajukan verifikasi sertifikat TKDN untuk industri komponen mesin...',
            defaultPicRole: 'pic-3'
        },
        {
            id: 'CAT-METRO',
            code: 'MET',
            name: 'Pelayanan Tera / Tera Ulang & Kalibrasi Metrologi',
            bidang: 'UPT Perlindungan Konsumen & Metrologi Legal',
            placeholder: 'Contoh: Pengajuan jadwal sidang tera ulang timbangan jembatan pabrik gula...',
            defaultPicRole: 'pic-4'
        },
        {
            id: 'CAT-PK',
            code: 'PKN',
            name: 'Pengaduan & Perlindungan Hak Konsumen',
            bidang: 'Bidang Perlindungan Konsumen & Tertib Niaga',
            placeholder: 'Contoh: Melaporkan dugaan peredaran barang elektronik tanpa standar SNI di pasar...',
            defaultPicRole: 'pic-5'
        },
        {
            id: 'CAT-KEDINASAN',
            code: 'KDN',
            name: 'Audiensi / Kunjungan Kedinasan / Tamu Pimpinan',
            bidang: 'Sekretariat Dinas',
            placeholder: 'Contoh: Koordinasi audiensi Kepala Dinas Perdagangan Kab. Banyuwangi dengan Kepala Dinas...',
            defaultPicRole: 'pic-6'
        },
        {
            id: 'CAT-LAINNYA',
            code: 'LNN',
            name: 'Lain-lain / Urusan Umum',
            bidang: 'Sub Bagian Umum & Kepegawaian',
            placeholder: 'Tuliskan secara jelas rincian keperluan atau informasi yang ingin Anda sampaikan...',
            defaultPicRole: 'pic-6'
        }
    ],

    pics: [
        {
            id: 'pic-1',
            name: 'Andri Prasetyo, S.E.',
            username: 'andri.pic',
            email: 'andri.pic@disperindag.jatimprov.go.id',
            department: 'Perdagangan Luar Negeri',
            status: 'Tersedia', // Tersedia | Sedang Melayani | Tidak di Tempat
            phone: '0812-3451-2201'
        },
        {
            id: 'pic-2',
            name: 'Siti Rahmawati, S.Sos.',
            username: 'siti.pic',
            email: 'siti.pic@disperindag.jatimprov.go.id',
            department: 'Perdagangan Dalam Negeri',
            status: 'Tersedia',
            phone: '0813-9876-5432'
        },
        {
            id: 'pic-3',
            name: 'Budi Santoso, S.T.',
            username: 'budi.pic',
            email: 'budi.pic@disperindag.jatimprov.go.id',
            department: 'Pembangunan Sumber Daya Industri',
            status: 'Sedang Melayani (1 Tamu)',
            phone: '0811-2233-4455'
        },
        {
            id: 'pic-4',
            name: 'Dedi Firmansyah, S.Si.',
            username: 'dedi.pic',
            email: 'dedi.pic@disperindag.jatimprov.go.id',
            department: 'UPT Metrologi Legal',
            status: 'Tersedia',
            phone: '0857-1122-3344'
        },
        {
            id: 'pic-5',
            name: 'Nurul Aini, S.H.',
            username: 'nurul.pic',
            email: 'nurul.pic@disperindag.jatimprov.go.id',
            department: 'Perlindungan Konsumen & Tertib Niaga',
            status: 'Tidak di Tempat / Istirahat',
            phone: '0822-4455-6677'
        },
        {
            id: 'pic-6',
            name: 'Ir. Hendra Kusuma',
            username: 'hendra.pic',
            email: 'hendra.pic@disperindag.jatimprov.go.id',
            department: 'Sekretariat Dinas',
            status: 'Tersedia',
            phone: '0812-7788-9900'
        }
    ],

    users: [
        {
            id: 'usr-resp',
            name: 'Mega Wijaya',
            role: 'resepsionis',
            email: 'resepsionis@disperindag.jatimprov.go.id',
            title: 'Petugas Resepsionis Lobby Utama',
            avatar: 'profile-picture-3.jpg'
        },
        {
            id: 'usr-admin',
            name: 'Ahmad Zaki, S.Kom.',
            role: 'admin',
            email: 'admin@disperindag.jatimprov.go.id',
            title: 'Administrator Operasional (Semua Lokasi)',
            avatar: 'profile-picture-1.jpg'
        },
        {
            id: 'usr-sa',
            name: 'Bambang Soediro, M.M.',
            role: 'superadmin',
            email: 'superadmin@disperindag.jatimprov.go.id',
            title: 'Super Administrator Sistem',
            avatar: 'profile-picture-2.jpg'
        }
    ],

    visits: [
        {
            id: 'VIS-20261016-001',
            queueNumber: 'A-011',
            locationId: 'LOC-01',
            locationName: 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim',
            qrToken: 'QR-DISPERINDAG-LOBBY-UTAMA',
            guestEmail: 'dewi.lestari@gmail.com',
            guestName: 'Dewi Lestari, S.T.',
            guestCategory: 'Bukan Kelompok Rentan',
            guestAgency: 'PT Maju Terang Abadi',
            guestPhone: '081234567890',
            guestAddress: 'Jl. Rungkut Industri Raya No. 25, Surabaya',
            categoryId: 'CAT-PLN',
            categoryName: 'Konsultasi Perdagangan Luar Negeri (Ekspor & Impor)',
            bidang: 'Bidang Perdagangan Luar Negeri',
            details: 'Konsultasi penerbitan Surat Keterangan Asal (SKA) Form D untuk komoditas rempah dan kopi ke pasar ASEAN.',
            signatureData: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40"><path d="M10,20 Q30,5 50,20 T90,20" fill="none" stroke="black" stroke-width="2"/></svg>',
            status: 'Selesai',
            createdAt: '2026-10-16T08:30:00.000Z',
            picId: 'pic-1',
            picName: 'Andri Prasetyo, S.E.',
            picDepartment: 'Perdagangan Luar Negeri',
            acceptedAt: '2026-10-16T08:45:00.000Z',
            completedAt: '2026-10-16T09:20:00.000Z',
            hasil: 'Tamu telah diberikan penjelasan alur verifikasi berkas SKA online e-SKA dan checklist dokumen lampiran PEB. Tamu memahami dan akan mengunggah berkas besok.',
            reassignmentTrail: []
        },
        {
            id: 'VIS-20261016-002',
            queueNumber: 'A-012',
            locationId: 'LOC-01',
            locationName: 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim',
            qrToken: 'QR-DISPERINDAG-LOBBY-UTAMA',
            guestEmail: 'fajar.prasetya@cakrawala.co.id',
            guestName: 'Fajar Prasetya',
            guestCategory: 'Bukan Kelompok Rentan',
            guestAgency: 'CV Cakrawala Mandiri',
            guestPhone: '081377889911',
            guestAddress: 'Jl. Ahmad Yani No. 102, Sidoarjo',
            categoryId: 'CAT-IND',
            categoryName: 'Fasilitasi Industri, TKDN & Sertifikasi Halal IKM',
            bidang: 'Bidang Pembangunan Sumber Daya Industri',
            details: 'Pendampingan pengajuan sertifikat Tingkat Komponen Dalam Negeri (TKDN) Industri Kecil.',
            signatureData: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40"><path d="M5,25 Q40,0 60,30 T95,15" fill="none" stroke="black" stroke-width="2"/></svg>',
            status: 'Diproses',
            createdAt: '2026-10-16T09:40:00.000Z',
            picId: 'pic-3',
            picName: 'Budi Santoso, S.T.',
            picDepartment: 'Pembangunan Sumber Daya Industri',
            acceptedAt: '2026-10-16T09:50:00.000Z',
            completedAt: null,
            hasil: null,
            reassignmentTrail: []
        },
        {
            id: 'VIS-20261016-003',
            queueNumber: 'A-013',
            locationId: 'LOC-01',
            locationName: 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim',
            qrToken: 'QR-DISPERINDAG-LOBBY-UTAMA',
            guestEmail: 'hadi.susanto@surabayagas.com',
            guestName: 'Hadi Susanto, M.T.',
            guestCategory: 'Bukan Kelompok Rentan',
            guestAgency: 'PT Surabaya Gas Energi',
            guestPhone: '081299001122',
            guestAddress: 'Jl. Margomulyo Indah Blok C No. 4, Surabaya',
            categoryId: 'CAT-METRO',
            categoryName: 'Pelayanan Tera / Tera Ulang & Kalibrasi Metrologi',
            bidang: 'UPT Perlindungan Konsumen & Metrologi Legal',
            details: 'Permohonan verifikasi dan kalibrasi meter arus gas industri.',
            signatureData: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40"><path d="M10,10 L40,35 L70,10 L90,30" fill="none" stroke="black" stroke-width="2"/></svg>',
            status: 'Menunggu',
            createdAt: '2026-10-16T10:10:00.000Z',
            picId: 'pic-4',
            picName: 'Dedi Firmansyah, S.Si.',
            picDepartment: 'UPT Metrologi Legal',
            acceptedAt: null,
            completedAt: null,
            hasil: null,
            reassignmentTrail: []
        },
        {
            id: 'VIS-20261016-004',
            queueNumber: 'A-014',
            locationId: 'LOC-01',
            locationName: 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim',
            qrToken: 'QR-DISPERINDAG-PINTU-TIMUR',
            guestEmail: 'yuni.kartika@bappeda.jatimprov.go.id',
            guestName: 'Dra. Hj. Yuni Kartika',
            guestCategory: 'Lansia',
            guestAgency: 'Bappeda Provinsi Jawa Timur',
            guestPhone: '081233445566',
            guestAddress: 'Jl. Pahlawan No. 108, Surabaya',
            categoryId: 'CAT-KEDINASAN',
            categoryName: 'Audiensi / Kunjungan Kedinasan / Tamu Pimpinan',
            bidang: 'Sekretariat Dinas',
            details: 'Koordinasi data realisasi ekspor industri manufaktur semester II untuk evaluasi RPJMD Jawa Timur.',
            signatureData: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="40"><path d="M10,25 C30,5 70,35 90,15" fill="none" stroke="black" stroke-width="2"/></svg>',
            status: 'Menunggu',
            createdAt: '2026-10-16T10:25:00.000Z',
            picId: null,
            picName: null,
            picDepartment: null,
            acceptedAt: null,
            completedAt: null,
            hasil: null,
            reassignmentTrail: []
        }
    ],

    audit_logs: [
        {
            id: 'LOG-001',
            timestamp: '2026-10-16T08:30:00.000Z',
            actorName: 'Tamu Dewi Lestari',
            actorRole: 'Tamu',
            action: 'visit.created',
            detail: 'Kunjungan baru dibuat dengan nomor urut #A-011 (Lobby Utama)',
            location: 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim'
        },
        {
            id: 'LOG-002',
            timestamp: '2026-10-16T08:33:00.000Z',
            actorName: 'Mega Wijaya',
            actorRole: 'Resepsionis',
            action: 'pic.assigned',
            detail: 'Menugaskan kunjungan #A-011 kepada Andri Prasetyo, S.E. (Perdagangan Luar Negeri)',
            location: 'Lobby Utama'
        },
        {
            id: 'LOG-003',
            timestamp: '2026-10-16T08:45:00.000Z',
            actorName: 'Andri Prasetyo, S.E.',
            actorRole: 'PIC',
            action: 'visit.accepted',
            detail: 'PIC menerima penugasan kunjungan #A-011. Status otomatis berubah menjadi Diproses.',
            location: 'Ruang Perdagangan Luar Negeri'
        },
        {
            id: 'LOG-004',
            timestamp: '2026-10-16T09:20:00.000Z',
            actorName: 'Andri Prasetyo, S.E.',
            actorRole: 'PIC',
            action: 'visit.completed',
            detail: 'PIC menyimpan hasil/solusi kunjungan #A-011. Status otomatis berubah menjadi Selesai.',
            location: 'Ruang Perdagangan Luar Negeri'
        }
    ]
};

const SiTamuStore = {
    init: function () {
        if (!localStorage.getItem(SITAMU_STORAGE_KEY)) {
            this.reset();
        }
    },

    reset: function () {
        localStorage.setItem(SITAMU_STORAGE_KEY, JSON.stringify(SiTamuSeed));
        console.info('[SiTamuStore] Data store seeded to default.');
    },

    getDb: function () {
        this.init();
        try {
            return JSON.parse(localStorage.getItem(SITAMU_STORAGE_KEY)) || SiTamuSeed;
        } catch (e) {
            console.error('[SiTamuStore] Error parsing database:', e);
            this.reset();
            return JSON.parse(localStorage.getItem(SITAMU_STORAGE_KEY));
        }
    },

    saveDb: function (db) {
        localStorage.setItem(SITAMU_STORAGE_KEY, JSON.stringify(db));
    },

    // Session Management (Mock Auth)
    getSession: function () {
        try {
            return JSON.parse(sessionStorage.getItem(SITAMU_SESSION_KEY)) || {
                role: 'tamu',
                email: 'dewi.lestari@gmail.com',
                name: 'Dewi Lestari, S.T.'
            };
        } catch (e) {
            return { role: 'tamu', email: 'guest@example.com', name: 'Tamu Umum' };
        }
    },

    setSession: function (user) {
        sessionStorage.setItem(SITAMU_SESSION_KEY, JSON.stringify(user));
    },

    clearSession: function () {
        sessionStorage.removeItem(SITAMU_SESSION_KEY);
    },

    // Location & QR
    getLocations: function () {
        return this.getDb().locations || [];
    },

    getLocationById: function (id) {
        return this.getLocations().find(loc => loc.id === id) || null;
    },

    getQRCodes: function () {
        return this.getDb().qr_codes || [];
    },

    getQRByToken: function (token) {
        return this.getQRCodes().find(q => q.token === token) || null;
    },

    // Categories
    getCategories: function () {
        return this.getDb().categories || [];
    },

    getCategoryById: function (id) {
        return this.getCategories().find(c => c.id === id) || null;
    },

    // PICs
    getPICs: function () {
        return this.getDb().pics || [];
    },

    getPICById: function (id) {
        return this.getPICs().find(p => p.id === id) || null;
    },

    // Visits
    getVisits: function (filter = {}) {
        let list = this.getDb().visits || [];
        if (filter.status) {
            list = list.filter(v => v.status === filter.status);
        }
        if (filter.locationId) {
            list = list.filter(v => v.locationId === filter.locationId);
        }
        if (filter.picId) {
            list = list.filter(v => v.picId === filter.picId);
        }
        if (filter.guestEmail) {
            list = list.filter(v => v.guestEmail.toLowerCase() === filter.guestEmail.toLowerCase());
        }
        if (filter.activeOnly) {
            list = list.filter(v => v.status === 'Menunggu' || v.status === 'Diproses');
        }
        // sort by newest
        return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    getVisitById: function (id) {
        return (this.getDb().visits || []).find(v => v.id === id) || null;
    },

    // Check if guest previously reported
    findGuestPreviousProfile: function (email) {
        if (!email) return null;
        const normalized = email.trim().toLowerCase();
        const visits = (this.getDb().visits || []).filter(v => v.guestEmail && v.guestEmail.toLowerCase() === normalized);
        if (visits.length > 0) {
            // return the latest visit profile
            visits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const latest = visits[0];
            return {
                guestName: latest.guestName,
                guestCategory: latest.guestCategory,
                guestAgency: latest.guestAgency,
                guestPhone: latest.guestPhone,
                guestAddress: latest.guestAddress,
                previousVisitsCount: visits.length
            };
        }
        return null;
    },

    getGuestHistory: function (email) {
        if (!email) return [];
        const normalized = email.trim().toLowerCase();
        return (this.getDb().visits || [])
            .filter(v => v.guestEmail && v.guestEmail.toLowerCase() === normalized)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // Tamu submits form
    createVisit: function (formData) {
        const db = this.getDb();
        const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const countToday = (db.visits || []).filter(v => v.createdAt.startsWith(new Date().toISOString().slice(0, 10))).length + 1;
        const queueNumber = 'A-' + String(countToday + 10).padStart(3, '0');
        const visitId = 'VIS-' + todayStr + '-' + String(countToday).padStart(3, '0');

        const cat = this.getCategoryById(formData.categoryId);
        const bidang = cat ? cat.bidang : 'Pelayanan Umum';

        const newVisit = {
            id: visitId,
            queueNumber: queueNumber,
            locationId: formData.locationId || 'LOC-01',
            locationName: formData.locationName || 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim',
            qrToken: formData.qrToken || 'QR-DISPERINDAG-LOBBY-UTAMA',
            guestEmail: formData.guestEmail,
            guestName: formData.guestName,
            guestCategory: formData.guestCategory || 'Bukan Kelompok Rentan',
            guestAgency: formData.guestAgency,
            guestPhone: formData.guestPhone,
            guestAddress: formData.guestAddress,
            categoryId: formData.categoryId,
            categoryName: cat ? cat.name : 'Keperluan Kunjungan',
            bidang: bidang,
            details: formData.details,
            signatureData: formData.signatureData || '',
            status: 'Menunggu',
            createdAt: new Date().toISOString(),
            picId: null,
            picName: null,
            picDepartment: null,
            acceptedAt: null,
            completedAt: null,
            hasil: null,
            reassignmentTrail: []
        };

        db.visits.unshift(newVisit);
        this.saveDb(db);

        this.addAuditLog({
            actorName: formData.guestName,
            actorRole: 'Tamu',
            action: 'visit.created',
            detail: `Tamu mendaftar kunjungan baru dengan nomor urut #${queueNumber}. Keperluan: ${newVisit.categoryName}`,
            location: newVisit.locationName
        });

        return newVisit;
    },

    // Resepsionis assigns PIC
    assignPIC: function (visitId, picId, actorName = 'Mega Wijaya (Resepsionis)') {
        const db = this.getDb();
        const visit = db.visits.find(v => v.id === visitId);
        const pic = db.pics.find(p => p.id === picId);
        if (!visit || !pic) return false;

        visit.picId = pic.id;
        visit.picName = pic.name;
        visit.picDepartment = pic.department;
        // status remains Menunggu until PIC accepts
        this.saveDb(db);

        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Resepsionis',
            action: 'pic.assigned',
            detail: `Menugaskan kunjungan #${visit.queueNumber} (${visit.guestName}) ke ${pic.name} (${pic.department})`,
            location: visit.locationName
        });

        return true;
    },

    // Resepsionis reassigns PIC (Tugaskan Ulang)
    reassignPIC: function (visitId, newPicId, reason, actorName = 'Mega Wijaya (Resepsionis)') {
        const db = this.getDb();
        const visit = db.visits.find(v => v.id === visitId);
        const newPic = db.pics.find(p => p.id === newPicId);
        if (!visit || !newPic || !reason) return false;

        const oldPicName = visit.picName || 'Belum ada PIC';

        // Add to reassignment trail
        if (!visit.reassignmentTrail) visit.reassignmentTrail = [];
        visit.reassignmentTrail.push({
            fromPicId: visit.picId,
            fromPicName: oldPicName,
            toPicId: newPic.id,
            toPicName: newPic.name,
            reason: reason,
            reassignedAt: new Date().toISOString(),
            actorName: actorName
        });

        visit.picId = newPic.id;
        visit.picName = newPic.name;
        visit.picDepartment = newPic.department;
        // reset status back to Menunggu
        visit.status = 'Menunggu';
        visit.acceptedAt = null;

        this.saveDb(db);

        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Resepsionis',
            action: 'pic.reassigned',
            detail: `Pengalihan PIC untuk kunjungan #${visit.queueNumber} dari ${oldPicName} ke ${newPic.name}. Alasan: "${reason}". Status di-reset ke Menunggu.`,
            location: visit.locationName
        });

        return true;
    },

    // PIC accepts assignment -> automatically changes status to 'Diproses'
    acceptVisitByPIC: function (visitId, picId) {
        const db = this.getDb();
        const visit = db.visits.find(v => v.id === visitId);
        if (!visit) return false;

        visit.status = 'Diproses';
        visit.acceptedAt = new Date().toISOString();
        this.saveDb(db);

        this.addAuditLog({
            actorName: visit.picName || 'PIC',
            actorRole: 'PIC',
            action: 'visit.accepted',
            detail: `PIC menerima kunjungan #${visit.queueNumber} (${visit.guestName}). Status otomatis berubah menjadi Diproses.`,
            location: visit.locationName
        });

        return true;
    },

    // PIC saves hasil/solusi -> automatically changes status to 'Selesai'
    saveHasilAndComplete: function (visitId, hasilText, picId) {
        if (!hasilText || !hasilText.trim()) return false;
        const db = this.getDb();
        const visit = db.visits.find(v => v.id === visitId);
        if (!visit) return false;

        visit.hasil = hasilText.trim();
        visit.status = 'Selesai';
        visit.completedAt = new Date().toISOString();
        this.saveDb(db);

        this.addAuditLog({
            actorName: visit.picName || 'PIC',
            actorRole: 'PIC',
            action: 'visit.completed',
            detail: `PIC menyimpan hasil pelayanan kunjungan #${visit.queueNumber} (${visit.guestName}). Status otomatis menjadi Selesai.`,
            location: visit.locationName
        });

        return true;
    },

    // Cancellation with mandatory reason (Resepsionis / Admin)
    cancelVisit: function (visitId, reason, actorName, actorRole) {
        if (!reason || !reason.trim()) return false;
        const db = this.getDb();
        const visit = db.visits.find(v => v.id === visitId);
        if (!visit) return false;

        visit.status = 'Dibatalkan';
        visit.cancellationReason = reason.trim();
        visit.cancelledAt = new Date().toISOString();
        visit.cancelledBy = actorName;
        this.saveDb(db);

        this.addAuditLog({
            actorName: actorName,
            actorRole: actorRole,
            action: 'visit.cancelled',
            detail: `Membatalkan kunjungan #${visit.queueNumber} (${visit.guestName}). Alasan: "${reason.trim()}".`,
            location: visit.locationName
        });

        return true;
    },

    // Admin downgrades status to Draft
    downgradeToDraft: function (visitId, actorName = 'Admin Operasional') {
        const db = this.getDb();
        const visit = db.visits.find(v => v.id === visitId);
        if (!visit) return false;

        const previousStatus = visit.status;
        visit.status = 'Draf';
        this.saveDb(db);

        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Admin',
            action: 'visit.downgraded_to_draft',
            detail: `Menurunkan status kunjungan #${visit.queueNumber} (${visit.guestName}) dari ${previousStatus} menjadi Draf untuk penyesuaian data.`,
            location: visit.locationName
        });

        return true;
    },

    // Super Admin reopens visit (no mandatory reason needed)
    reopenVisit: function (visitId, actorName = 'Super Admin') {
        const db = this.getDb();
        const visit = db.visits.find(v => v.id === visitId);
        if (!visit) return false;

        const previousStatus = visit.status;
        // restore to Menunggu or Diproses
        visit.status = visit.picId ? 'Diproses' : 'Menunggu';
        visit.reopenedAt = new Date().toISOString();
        visit.reopenedBy = actorName;
        this.saveDb(db);

        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Super Admin',
            action: 'visit.reopened',
            detail: `Super Admin membuka kembali kunjungan #${visit.queueNumber} (${visit.guestName}) dari status ${previousStatus} ke status ${visit.status}.`,
            location: visit.locationName
        });

        return true;
    },

    // Admin updates visit status (Menunggu / Diproses)
    adminUpdateVisitStatus: function (visitId, newStatus, actorName = 'Ahmad Zaki (Admin)') {
        const db = this.getDb();
        const visit = db.visits.find(v => v.id === visitId);
        if (!visit) return false;

        // Validasi ketat: Admin HANYA dapat mengubah status ke Menunggu atau Diproses.
        // Status Selesai HANYA terjadi otomatis saat PIC menyimpan hasil/solusi.
        if (newStatus !== 'Menunggu' && newStatus !== 'Diproses') {
            console.warn('Admin hanya dapat mengubah status ke Menunggu atau Diproses. Status Selesai hanya terjadi otomatis saat PIC menyimpan hasil pelayanan.');
            return false;
        }

        const previousStatus = visit.status;
        visit.status = newStatus;
        if (newStatus === 'Diproses' && !visit.acceptedAt) {
            visit.acceptedAt = new Date().toISOString();
        }
        this.saveDb(db);

        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Admin',
            action: 'visit.status_updated',
            detail: `Admin mengubah status kunjungan #${visit.queueNumber} (${visit.guestName}) dari ${previousStatus} menjadi ${newStatus}.`,
            location: visit.locationName
        });

        return true;
    },

    // QR Management
    addQRCode: function (qrData, actorName = 'Admin') {
        const db = this.getDb();
        const newId = 'QR-' + String(db.qr_codes.length + 1).padStart(3, '0');
        const newQr = {
            id: newId,
            token: qrData.token || `QR-${Date.now()}`,
            label: qrData.label,
            locationId: qrData.locationId,
            locationName: qrData.locationName,
            status: 'Aktif',
            createdAt: new Date().toISOString(),
            scanCount: 0
        };
        db.qr_codes.push(newQr);
        this.saveDb(db);

        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Admin',
            action: 'qr.created',
            detail: `Membuat QR Code baru: "${newQr.label}" untuk ${newQr.locationName}. Token: ${newQr.token}`,
            location: newQr.locationName
        });

        return newQr;
    },

    // Category / Form Question Management
    saveCategory: function (catData, actorName = 'Admin') {
        const db = this.getDb();
        let cat = db.categories.find(c => c.id === catData.id);
        if (cat) {
            cat.name = catData.name;
            cat.bidang = catData.bidang;
            cat.placeholder = catData.placeholder;
            this.addAuditLog({
                actorName: actorName,
                actorRole: 'Admin',
                action: 'form_question.updated',
                detail: `Memperbarui kategori pertanyaan form: "${cat.name}" (${cat.bidang})`,
                location: 'Sistem Pusat'
            });
        } else {
            const newId = 'CAT-' + (catData.code || String(Date.now()).slice(-4));
            cat = {
                id: newId,
                code: catData.code || 'GEN',
                name: catData.name,
                bidang: catData.bidang,
                placeholder: catData.placeholder || 'Tuliskan rincian keperluan Anda...'
            };
            db.categories.push(cat);
            this.addAuditLog({
                actorName: actorName,
                actorRole: 'Admin',
                action: 'form_question.created',
                detail: `Menambahkan kategori pertanyaan baru: "${cat.name}" (${cat.bidang})`,
                location: 'Sistem Pusat'
            });
        }
        this.saveDb(db);
        return cat;
    },

    deleteCategory: function (catId, actorName = 'Admin') {
        const db = this.getDb();
        const idx = db.categories.findIndex(c => c.id === catId);
        if (idx !== -1) {
            const deleted = db.categories.splice(idx, 1)[0];
            this.saveDb(db);
            this.addAuditLog({
                actorName: actorName,
                actorRole: 'Admin',
                action: 'form_question.deleted',
                detail: `Menghapus kategori pertanyaan: "${deleted.name}"`,
                location: 'Sistem Pusat'
            });
            return true;
        }
        return false;
    },

    // Super Admin: Master Locations
    saveLocation: function (locData, actorName = 'Super Admin') {
        const db = this.getDb();
        if (!db.locations) db.locations = [];
        let loc = db.locations.find(l => l.id === locData.id);
        if (loc) {
            loc.name = locData.name;
            loc.address = locData.address;
            loc.code = locData.code;
            loc.status = locData.status || 'Aktif';
            this.addAuditLog({
                actorName: actorName,
                actorRole: 'Super Admin',
                action: 'location.updated',
                detail: `Memperbarui data master lokasi: "${loc.name}" (${loc.code})`,
                location: loc.name
            });
        } else {
            const count = db.locations.length + 1;
            const newId = 'LOC-' + String(count).padStart(2, '0');
            loc = {
                id: newId,
                name: locData.name,
                address: locData.address,
                code: locData.code || ('LOC' + count),
                status: locData.status || 'Aktif'
            };
            db.locations.push(loc);
            this.addAuditLog({
                actorName: actorName,
                actorRole: 'Super Admin',
                action: 'location.created',
                detail: `Menambahkan master lokasi baru: "${loc.name}" (${loc.code})`,
                location: loc.name
            });
        }
        this.saveDb(db);
        return loc;
    },

    toggleLocationStatus: function (locId, actorName = 'Super Admin') {
        const db = this.getDb();
        const loc = (db.locations || []).find(l => l.id === locId);
        if (!loc) return false;
        loc.status = loc.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
        this.saveDb(db);
        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Super Admin',
            action: 'location.status_toggled',
            detail: `Mengubah status lokasi "${loc.name}" menjadi ${loc.status}`,
            location: loc.name
        });
        return loc;
    },

    // Super Admin: Master QR Management (with Token Revocation & Regeneration)
    regenerateQRCode: function (qrId, actorName = 'Super Admin') {
        const db = this.getDb();
        const qr = (db.qr_codes || []).find(q => q.id === qrId);
        if (!qr) return null;

        const oldToken = qr.token;
        const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
        const newToken = `QR-${qr.id}-${randomHex}`;

        qr.token = newToken;
        qr.lastRegeneratedAt = new Date().toISOString();
        qr.previousTokens = qr.previousTokens || [];
        qr.previousTokens.push({
            token: oldToken,
            revokedAt: new Date().toISOString(),
            revokedBy: actorName
        });

        this.saveDb(db);

        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Super Admin',
            action: 'qr.regenerated',
            detail: `Regenerasi QR Code "${qr.label}". Token lama (${oldToken}) DICABUT/BATAL. Token baru aktif: ${newToken}`,
            location: qr.locationName
        });

        return qr;
    },

    toggleQRStatus: function (qrId, actorName = 'Super Admin') {
        const db = this.getDb();
        const qr = (db.qr_codes || []).find(q => q.id === qrId);
        if (!qr) return false;
        qr.status = qr.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
        this.saveDb(db);
        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Super Admin',
            action: 'qr.status_toggled',
            detail: `Mengubah status QR Code "${qr.label}" menjadi ${qr.status}`,
            location: qr.locationName
        });
        return qr;
    },

    deleteQRCode: function (qrId, actorName = 'Super Admin') {
        const db = this.getDb();
        const idx = (db.qr_codes || []).findIndex(q => q.id === qrId);
        if (idx !== -1) {
            const deleted = db.qr_codes.splice(idx, 1)[0];
            this.saveDb(db);
            this.addAuditLog({
                actorName: actorName,
                actorRole: 'Super Admin',
                action: 'qr.deleted',
                detail: `Menghapus QR Code: "${deleted.label}" (${deleted.locationName})`,
                location: deleted.locationName
            });
            return true;
        }
        return false;
    },

    // Super Admin: Account Management
    // Rule: Admin accounts have NO location assignment (all locations), PICs mapped to department, Resepsionis mapped to location
    getAllAccounts: function () {
        const db = this.getDb();
        if (!db.accounts) {
            const defaultAccounts = [
                {
                    id: 'ACC-SA-01',
                    name: 'Bambang Soediro, M.M.',
                    username: 'superadmin',
                    email: 'superadmin@disperindag.jatimprov.go.id',
                    role: 'superadmin',
                    roleLabel: 'Super Admin',
                    locationId: null,
                    locationName: 'Lintas Sistem (Semua Lokasi)',
                    department: 'Pusat Kontrol Sistem',
                    status: 'Aktif',
                    phone: '0811-3344-5566'
                },
                {
                    id: 'ACC-ADM-01',
                    name: 'Ahmad Zaki, S.Kom.',
                    username: 'ahmad.admin',
                    email: 'admin@disperindag.jatimprov.go.id',
                    role: 'admin',
                    roleLabel: 'Admin Operasional',
                    locationId: null, // Admin has NO location assignment
                    locationName: 'Semua Lokasi (Tidak Dibatasi)',
                    department: 'Operasional Pelayanan',
                    status: 'Aktif',
                    phone: '0812-9988-7766'
                },
                {
                    id: 'ACC-RESP-01',
                    name: 'Mega Wijaya',
                    username: 'mega.resepsionis',
                    email: 'resepsionis@disperindag.jatimprov.go.id',
                    role: 'resepsionis',
                    roleLabel: 'Resepsionis',
                    locationId: 'LOC-01',
                    locationName: 'Kantor Dinas Perindustrian dan Perdagangan Prov. Jatim',
                    department: 'Front Desk / Resepsionis Lobby Utama',
                    status: 'Aktif',
                    phone: '0812-3344-5566'
                },
                {
                    id: 'ACC-RESP-02',
                    name: 'Lestari Indah, A.Md.',
                    username: 'lestari.metro',
                    email: 'resepsionis.metro@disperindag.jatimprov.go.id',
                    role: 'resepsionis',
                    roleLabel: 'Resepsionis',
                    locationId: 'LOC-02',
                    locationName: 'UPT Perlindungan Konsumen & Metrologi Legal Surabaya',
                    department: 'Front Desk UPT Metrologi Legal',
                    status: 'Aktif',
                    phone: '0857-4433-2211'
                }
            ];

            // Add pics to accounts
            (db.pics || []).forEach(p => {
                defaultAccounts.push({
                    id: 'ACC-' + p.id.toUpperCase(),
                    name: p.name,
                    username: p.username,
                    email: p.email,
                    role: 'pic',
                    roleLabel: 'PIC Departemen',
                    locationId: null,
                    locationName: 'Berdasarkan Bidang',
                    department: p.department,
                    status: 'Aktif',
                    phone: p.phone
                });
            });

            db.accounts = defaultAccounts;
            this.saveDb(db);
        }
        return db.accounts;
    },

    saveAccount: function (accData, actorName = 'Super Admin') {
        const db = this.getDb();
        if (!db.accounts) this.getAllAccounts();
        let acc = db.accounts.find(a => a.id === accData.id);

        // Normalize location for Admin: MUST have NO location assignment
        let locId = accData.locationId;
        let locName = accData.locationName;
        if (accData.role === 'admin') {
            locId = null;
            locName = 'Semua Lokasi (Tidak Dibatasi)';
        } else if (accData.role === 'superadmin') {
            locId = null;
            locName = 'Lintas Sistem (Semua Lokasi)';
        } else if (accData.role === 'pic') {
            locId = null;
            locName = 'Berdasarkan Bidang';
        }

        const roleLabels = {
            superadmin: 'Super Admin',
            admin: 'Admin Operasional',
            resepsionis: 'Resepsionis',
            pic: 'PIC Departemen'
        };

        if (acc) {
            acc.name = accData.name;
            acc.username = accData.username;
            acc.email = accData.email;
            acc.role = accData.role;
            acc.roleLabel = roleLabels[accData.role] || accData.role;
            acc.locationId = locId;
            acc.locationName = locName;
            acc.department = accData.department || '-';
            acc.phone = accData.phone || '-';
            acc.status = accData.status || 'Aktif';

            this.addAuditLog({
                actorName: actorName,
                actorRole: 'Super Admin',
                action: 'account.updated',
                detail: `Memperbarui akun staf: "${acc.name}" (${acc.roleLabel})`,
                location: 'Sistem Pusat'
            });
        } else {
            const newId = 'ACC-' + Date.now().toString().slice(-6);
            acc = {
                id: newId,
                name: accData.name,
                username: accData.username,
                email: accData.email,
                role: accData.role,
                roleLabel: roleLabels[accData.role] || accData.role,
                locationId: locId,
                locationName: locName,
                department: accData.department || '-',
                phone: accData.phone || '-',
                status: accData.status || 'Aktif'
            };
            db.accounts.push(acc);

            this.addAuditLog({
                actorName: actorName,
                actorRole: 'Super Admin',
                action: 'account.created',
                detail: `Membuat akun staf baru: "${acc.name}" sebagai ${acc.roleLabel}. Lokasi: ${acc.locationName}`,
                location: 'Sistem Pusat'
            });
        }

        this.saveDb(db);
        return acc;
    },

    toggleAccountStatus: function (accId, actorName = 'Super Admin') {
        const db = this.getDb();
        if (!db.accounts) this.getAllAccounts();
        const acc = db.accounts.find(a => a.id === accId);
        if (!acc) return false;
        acc.status = acc.status === 'Aktif' ? 'Nonaktif' : 'Aktif';
        this.saveDb(db);
        this.addAuditLog({
            actorName: actorName,
            actorRole: 'Super Admin',
            action: 'account.status_toggled',
            detail: `Mengubah status akun "${acc.name}" (${acc.roleLabel}) menjadi ${acc.status}`,
            location: 'Sistem Pusat'
        });
        return acc;
    },

    deleteAccount: function (accId, actorName = 'Super Admin') {
        const db = this.getDb();
        if (!db.accounts) this.getAllAccounts();
        const idx = db.accounts.findIndex(a => a.id === accId);
        if (idx !== -1) {
            const deleted = db.accounts.splice(idx, 1)[0];
            this.saveDb(db);
            this.addAuditLog({
                actorName: actorName,
                actorRole: 'Super Admin',
                action: 'account.deleted',
                detail: `Menghapus akun staf: "${deleted.name}" (${deleted.roleLabel})`,
                location: 'Sistem Pusat'
            });
            return true;
        }
        return false;
    },

    // Audit Log
    addAuditLog: function (entry) {
        const db = this.getDb();
        const logId = 'LOG-' + String(db.audit_logs.length + 1).padStart(3, '0');
        const newLog = {
            id: logId,
            timestamp: new Date().toISOString(),
            actorName: entry.actorName || 'Sistem',
            actorRole: entry.actorRole || 'System',
            action: entry.action || 'system.event',
            detail: entry.detail || '',
            location: entry.location || 'Disperindag Prov. Jatim'
        };
        db.audit_logs.unshift(newLog);
        this.saveDb(db);
    },

    getAuditLogs: function () {
        return (this.getDb().audit_logs || []).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
};

// Auto initialize on load
if (typeof window !== 'undefined') {
    window.SiTamuStore = SiTamuStore;
    SiTamuStore.init();
}
