(function() {
    'use strict';
    
    console.log('Custom app JS loaded successfully!');
    
    // Add CSS for local popup
    const style = document.createElement('style');
    style.textContent = `
        .custom-app-popup {
            position: fixed;
            right: 20px;
            top: 20px;
            background: #fff;
            color: #333;
            padding: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 100000;
            border-radius: 4px;
            max-width: 300px;
            border: 1px solid #d1d8dd;
            border-left: 4px solid #5e64ff;
        }
    `;
    document.head.appendChild(style);

    function showLocalPopup(message, title) {
        console.log('Showing local popup:', title, message);
        
        const popup = document.createElement('div');
        popup.className = 'custom-app-popup';
        
        if (title) {
            const titleEl = document.createElement('div');
            titleEl.textContent = title;
            titleEl.style.fontWeight = 'bold';
            titleEl.style.marginBottom = '5px';
            popup.appendChild(titleEl);
        }
        
        const messageEl = document.createElement('div');
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
        console.log('Showing intrusive popup:', title, message);
        try {
            if (window.frappe && typeof frappe.msgprint === 'function') {
                frappe.msgprint({
                    title: title || 'Notification',
                    message: message || '',
                    indicator: 'blue'
                });
            } else {
                showLocalPopup(message, title);
            }
        } catch (e) {
            console.error('Error showing intrusive popup:', e);
            showLocalPopup(message, title);
        }
    }

    function onEvent(data) {
        console.log('Event received:', data);
        if (!data) {
            console.warn('Empty event data received');
            return;
        }
        
        const msg = data.message || '';
        const title = data.title || 'Notification';
        showIntrusivePopup(msg, title);
    }

    // Subscribe to events
    console.log('Setting up realtime listener for custom_app_event');
    
    if (window.frappe && window.frappe.realtime && typeof frappe.realtime.on === 'function') {
        frappe.realtime.on('custom_app_event', function(data) {
            console.log('custom_app_event received:', data);
            onEvent(data);
        });
        console.log('Successfully subscribed to custom_app_event');
    } else {
        console.warn('Frappe realtime not available');
    }

    // Make functions available globally for testing
    window.showLocalPopup = showLocalPopup;
    window.showIntrusivePopup = showIntrusivePopup;
    window.onEvent = onEvent;
    window.__custom_app_test = function() {
        onEvent({
            message: 'Test message from console',
            title: 'Test Notification'
        });
    };

    console.log('Custom app initialization complete');

})();
