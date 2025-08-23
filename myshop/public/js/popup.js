frappe.ready(function() {
    // Wait a bit to ensure realtime is fully initialized
    setTimeout(function() {
        frappe.realtime.on('my_custom_event', function(data) {
            console.log("Custom Event Received:", data);
            
            // Show alert popup
            frappe.show_alert({
                message: data.msg || "Notification received",
                indicator: 'green'
            }, 5);
            
            // Optional: Show a dialog for more important messages
            if (data.important) {
                frappe.msgprint({
                    title: __('Notification'),
                    indicator: 'green',
                    message: data.msg
                });
            }
        });
        
        console.log("Custom event listener registered");
    }, 5000);
});


// (function() {
//     'use strict';

//     console.log('Custom app JS loading...');

//     // --- Inject CSS ---
//     const style = document.createElement('style');
//     style.textContent = `
//         .custom-app-popup {
//             position: fixed;
//             right: 20px;
//             top: 20px;
//             background: #fff;
//             color: #333;
//             padding: 15px;
//             box-shadow: 0 4px 12px rgba(0,0,0,0.15);
//             z-index: 100000;
//             border-radius: 4px;
//             max-width: 300px;
//             border: 1px solid #d1d8dd;
//             border-left: 4px solid #5e64ff;
//         }
//     `;
//     document.head.appendChild(style);

//     // --- Popup Functions ---
//     function showLocalPopup(message, title) {
//         console.log('Showing local popup:', title, message);

//         const popup = document.createElement('div');
//         popup.className = 'custom-app-popup';

//         if (title) {
//             const titleEl = document.createElement('div');
//             titleEl.textContent = title;
//             titleEl.style.fontWeight = 'bold';
//             titleEl.style.marginBottom = '5px';
//             popup.appendChild(titleEl);
//         }

//         const messageEl = document.createElement('div');
//         messageEl.textContent = message || '';
//         popup.appendChild(messageEl);

//         document.body.appendChild(popup);

//         setTimeout(() => popup.remove(), 5000);
//     }

//     function showIntrusivePopup(message, title) {
//         console.log('Showing intrusive popup:', title, message);
//         try {
//             if (window.frappe && typeof frappe.msgprint === 'function') {
//                 frappe.msgprint({
//                     title: title || 'Notification',
//                     message: message || '',
//                     indicator: 'blue'
//                 });
//             } else {
//                 showLocalPopup(message, title);
//             }
//         } catch (e) {
//             console.error('Error showing intrusive popup:', e);
//             showLocalPopup(message, title);
//         }
//     }

//     function onEvent(data) {
//         console.log('Event received:', data);
//         if (!data) {
//             console.warn('Empty event data received');
//             return;
//         }
//         const msg = data.message || '';
//         const title = data.title || 'Notification';
//         showIntrusivePopup(msg, title);
//     }

//     // --- Subscription Logic with retry ---
//     function subscribeRealtime() {
//         if (window.frappe && frappe.realtime && typeof frappe.realtime.on === 'function') {
//             frappe.realtime.on('custom_app_event', onEvent);
//             console.log('Subscribed to custom_app_event successfully');
//             return true;
//         }
//         return false;
//     }

//     // Try immediate subscription
//     if (!subscribeRealtime()) {
//         console.log('Realtime not ready yet, waiting for frappe.ready...');
//         frappe.ready(() => {
//             const ok = subscribeRealtime();
//             if (!ok) {
//                 // Retry a few times if frappe.realtime loads late
//                 let attempts = 0;
//                 const interval = setInterval(() => {
//                     if (subscribeRealtime() || attempts++ > 10) clearInterval(interval);
//                 }, 500);
//             }
//         });
//     }

//     // --- Make functions global for testing ---
//     window.showLocalPopup = showLocalPopup;
//     window.showIntrusivePopup = showIntrusivePopup;
//     window.onEvent = onEvent;
//     window.__custom_app_test = function() {
//         onEvent({ message: 'Test message from console', title: 'Test Notification' });
//     };

//     console.log('Custom app initialization complete');
// })();
