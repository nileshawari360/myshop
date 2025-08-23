// This is the safest for Desk applications
frappe.realtime.on('my_custom_event', function(data) {
    console.log("Custom event received:", data);
    
    // Show alert popup
    frappe.show_alert({
        message: data.message?.msg || data.message || data.msg || "Notification",
        indicator: data.type === 'error' ? 'red' : 'green'
    }, 5);
});

frappe.realtime.socket.on("custom_app_hello_response", function(data) {
    frappe.msgprint(data.message);
});

// Optional: Check if realtime is available
if (typeof frappe !== 'undefined' && frappe.realtime) {
    console.log("Realtime system available");
} else {
    console.warn("Frappe realtime not available");
}

