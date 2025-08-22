import frappe

@frappe.whitelist()
def send_realtime_notification(title, message, user=None, indicator="blue"):
    """
    Whitelisted method to send real-time notifications
    """
    try:
        frappe.publish_realtime(
            eventname="simple_realtime_notification",
            message={
                "title": title,
                "message": message,
                "indicator": indicator
            },
            user=user  # Send to specific user or all if None
        )
        return {"success": True, "message": "Notification sent"}
    except Exception as e:
        frappe.log_error(f"Error sending notification: {str(e)}")
        return {"success": False, "message": str(e)}
