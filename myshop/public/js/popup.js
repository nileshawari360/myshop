(function() {
    'use strict';

    // Add CSS styles for the popup
    function addPopupStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .custom-app-popup {
                position: fixed;
                right: 20px;
                bottom: 20px;
                background: #fff;
                color: #333;
                padding: 12px 16px;
                box-shadow: 0 6px 18px rgba(0,0,0,0.2);
                z-index: 99999;
                border-radius: 6px;
                max-width: 360px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.4;
                border-left: 4px solid #2490ef;
                animation: customAppPopupFadeIn 0.3s ease;
            }
            @keyframes customAppPopupFadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    function showLocalPopup(message, title) {
        const popup = document.createElement('div');
        popup.className = 'custom-app-popup';
        
        if (title) {
            const titleEl = document.createElement('strong');
            titleEl.textContent = title + ': ';
            titleEl.style.display = 'block';
            titleEl.style.marginBottom = '5px';
            popup.appendChild(titleEl);
        }
        
        const messageEl = document.createElement('span');
        messageEl.textContent = message || '';
        popup.appendChild(messageEl);
        
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
                showLocalPopup(message, title);
            }
        } catch (e) {
            // Fallback
            showLocalPopup(message, title);
        }
    }

    function onEvent(data) {
        if (!data) {
            console.warn('custom_app: received empty event data');
            return;
        }
        
        var msg = data.message || '';
        var title = data.title || 'Notification';
        showIntrusivePopup(msg, title);
    }

    function subscribe() {
        try {
            if (window.frappe && window.frappe.realtime && typeof frappe.realtime.on === 'function') {
                // subscribe once; server should publish to 'custom_app_event'
                frappe.realtime.on('custom_app_event', function(data) {
                    onEvent(data);
                });
                console.log('custom_app: subscribed to realtime events');
            } else {
                console.warn('custom_app: frappe.realtime not available; realtime subscriptions disabled');
            }
        } catch (e) {
            console.warn('custom_app: realtime subscribe failed', e);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        addPopupStyles();
        subscribe();
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            addPopupStyles();
            subscribe();
        });
    }

    // expose test hook for manual testing from console:
    window.__custom_app_on_event = onEvent;
    window.__custom_app_test = function() {
        onEvent({
            message: 'Test message from console',
            title: 'Test Notification'
        });
    };
})();
