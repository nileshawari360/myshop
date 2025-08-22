(function() {
    'use strict';

    function showLocalPopup(message) {
        const popup = document.createElement('div');
        popup.className = 'custom-app-popup';
        popup.innerText = message || '';
        Object.assign(popup.style, {
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            background: '#fff',
            color: '#111',
            padding: '12px 16px',
            boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
            zIndex: 99999,
            borderRadius: '6px',
            maxWidth: '360px',
            fontFamily: 'inherit',
            lineHeight: '1.3',
        });
        document.body.appendChild(popup);
        setTimeout(function() {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 5000);
    }

    function showIntrusivePopup(message, title) {
        try {
            if (window.frappe && typeof frappe.msgprint === 'function') {
                // Use Desk's intrusive msgprint for a modal-like notification
                frappe.msgprint({
                    title: title || 'Notification',
                    message: message || '',
                    indicator: 'blue'
                });
            } else {
                showLocalPopup(message);
            }
        } catch (e) {
            // Fallback
            showLocalPopup(message);
        }
    }

    function onEvent(data) {
        var msg = (data && data.message) ? data.message : '';
        var title = (data && data.title) ? data.title : 'Notification';
        showIntrusivePopup(msg, title);
    }

    function subscribe() {
        try {
            if (window.frappe && window.frappe.realtime && typeof frappe.realtime.on === 'function') {
                // subscribe once; server should publish to 'custom_app_event'
                frappe.realtime.on('custom_app_event', function(data) {
                    onEvent(data);
                });
            } else {
                console.warn('custom_app: frappe.realtime not available; realtime subscriptions disabled');
            }
        } catch (e) {
            console.warn('custom_app: realtime subscribe failed', e);
        }
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        subscribe();
    } else {
        document.addEventListener('DOMContentLoaded', subscribe);
    }

    // expose test hook for manual testing from console:
    window.__custom_app_on_event = onEvent;
})();
