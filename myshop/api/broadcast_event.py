def broadcast_event(message, action_type, user=None):
    import frappe
    from frappe import _

    # Emit the event
    event_data = {
        "message": message,
        "action_type": action_type
    }
    # Broadcast to specific user or all users
    if user:
        frappe.publish_realtime('custom_app_event', event_data, user=user)
    else:
        frappe.publish_realtime('custom_app_event', event_data)
