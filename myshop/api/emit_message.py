import frappe


@frappe.whitelist()
def emit_message(message, user=None, show_msgprint=True):
   
    import frappe
    from frappe import _

    target_user = user or getattr(frappe.local, 'session', {}).get('user') or None
    event = {
        'message': message,
    }

    if target_user:
        frappe.publish_realtime('custom_app_event', event, user=target_user)
    else:
        frappe.publish_realtime('custom_app_event', event)

    # Optional server-side msgprint for the caller
    if show_msgprint:
        frappe.msgprint(_(message))
