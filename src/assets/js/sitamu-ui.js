/**
 * SiTamu UI Helper & Components
 * Pure Vanilla JS + Bootstrap 5
 */

const SiTamuUI = {
    // Canvas Signature Pad
    initSignaturePad: function (canvasId, clearBtnId, hiddenInputId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;

        const ctx = canvas.getContext('2d');
        const clearBtn = document.getElementById(clearBtnId);
        const hiddenInput = document.getElementById(hiddenInputId);

        // Adjust DPI for crisp drawing
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const rect = canvas.getBoundingClientRect();
        canvas.width = (rect.width || 360) * ratio;
        canvas.height = (rect.height || 160) * ratio;
        ctx.scale(ratio, ratio);

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let drawing = false;
        let hasDrawn = false;

        function getPos(e) {
            const r = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return {
                x: clientX - r.left,
                y: clientY - r.top
            };
        }

        function startDrawing(e) {
            e.preventDefault();
            drawing = true;
            const pos = getPos(e);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }

        function draw(e) {
            if (!drawing) return;
            e.preventDefault();
            const pos = getPos(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
            hasDrawn = true;
            if (hiddenInput) {
                hiddenInput.value = canvas.toDataURL('image/png');
            }
        }

        function stopDrawing(e) {
            if (!drawing) return;
            drawing = false;
            if (hiddenInput && hasDrawn) {
                hiddenInput.value = canvas.toDataURL('image/png');
            }
        }

        // Mouse events
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        window.addEventListener('mouseup', stopDrawing);

        // Touch events
        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);

        if (clearBtn) {
            clearBtn.addEventListener('click', function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                hasDrawn = false;
                if (hiddenInput) hiddenInput.value = '';
            });
        }

        return {
            isEmpty: () => !hasDrawn,
            getDataUrl: () => (hasDrawn ? canvas.toDataURL('image/png') : ''),
            clear: () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                hasDrawn = false;
                if (hiddenInput) hiddenInput.value = '';
            }
        };
    },

    // Format Date & Time (WIB)
    formatDateTime: function (isoString) {
        if (!isoString) return '-';
        const d = new Date(isoString);
        return d.toLocaleDateString('id-ID', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) + ' WIB';
    },

    formatTimeOnly: function (isoString) {
        if (!isoString) return '-';
        const d = new Date(isoString);
        return d.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit'
        }) + ' WIB';
    },

    // Format Relative Time / Lama Menunggu
    formatDuration: function (isoString) {
        if (!isoString) return '-';
        const start = new Date(isoString).getTime();
        const now = new Date().getTime();
        const diffMinutes = Math.max(0, Math.floor((now - start) / (1000 * 60)));

        if (diffMinutes < 1) return 'Baru saja (< 1 m)';
        if (diffMinutes < 60) return `${diffMinutes} menit`;
        const hours = Math.floor(diffMinutes / 60);
        const mins = diffMinutes % 60;
        return `${hours} jam ${mins} m`;
    },

    // Status Badge Component
    getStatusBadge: function (status, withIcon = false) {
        const iconHtml = (icon) => withIcon ? `<i class="${icon} me-1"></i>` : '';
        switch (status) {
            case 'Menunggu':
                return `<span class="badge bg-warning text-dark">${iconHtml('fas fa-clock')}Menunggu</span>`;
            case 'Diproses':
                return `<span class="badge bg-info text-dark">${iconHtml('fas fa-spinner fa-spin')}Diproses</span>`;
            case 'Selesai':
                return `<span class="badge bg-success">${iconHtml('fas fa-check-circle')}Selesai</span>`;
            case 'Dibatalkan':
                return `<span class="badge bg-danger">${iconHtml('fas fa-times-circle')}Dibatalkan</span>`;
            case 'Draf':
                return `<span class="badge bg-secondary">${iconHtml('fas fa-file-alt')}Draf</span>`;
            default:
                return `<span class="badge bg-gray-500">${status || '-'}</span>`;
        }
    },

    // Toast Alert Notification
    showToast: function (title, message, icon = 'success') {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: title,
                text: message,
                icon: icon,
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        } else {
            alert(`${title}: ${message}`);
        }
    }
};

if (typeof window !== 'undefined') {
    window.SiTamuUI = SiTamuUI;
}
