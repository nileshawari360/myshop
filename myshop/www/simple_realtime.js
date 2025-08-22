// Listen for real-time notifications
frappe.realtime.on("simple_realtime_notification", function(data) {
    if (data && data.title && data.message) {
        showIntrusivePopup(data.title, data.message, data.indicator);
    }
});

// Function to show intrusive popup
function showIntrusivePopup(title, message, indicator = "blue") {
    // Create a dialog
    const dialog = new frappe.ui.Dialog({
        title: title,
        indicator: indicator,
        fields: [
            {
                fieldname: "message",
                fieldtype: "HTML",
                options: `<div style="padding: 10px 0;">${message}</div>`
            }
        ],
        primary_action_label: __("OK"),
        primary_action: function() {
            dialog.hide();
        }
    });
    
    // Show the dialog
    dialog.show();
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (dialog.displayed) {
            dialog.hide();
        }
    }, 10000);
}

// Add a test function to browser console for testing
window.simpleRealtimeTest = function() {
    frappe.call({
        method: "simple_realtime.send_realtime_notification",
        args: {
            title: "Test Notification",
            message: "This is a test notification!",
            indicator: "green"
        }
    });
};
