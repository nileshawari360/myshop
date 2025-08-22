def emit_message(message):
    """Emit a message to the desk UI."""
    import frappe
    from frappe import _

    # Emit the message event
    frappe.publish_realtime('custom_app/message', {'message': message})

    # Show a popup notification
    frappe.msgprint(_(message))
