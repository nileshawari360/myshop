document.addEventListener('DOMContentLoaded', function() {
    frappe.realtime.on('custom_app/message', function(data) {
        showPopup(data.message);
    });

    frappe.realtime.on('custom_app_event', function(data) {
        if (data.user) {
            if (data.user === getCurrentUser()) {
                showPopup(data.message);
            }
        } else {
            showPopup(data.message);
        }
    });

    function showPopup(message) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerText = message;
        document.body.appendChild(popup);

        setTimeout(() => {
            document.body.removeChild(popup);
        }, 3000);
    }

    function getCurrentUser() {
        // Logic to get the current user from the Frappe context
        return frappe.session.user;
    }
});
