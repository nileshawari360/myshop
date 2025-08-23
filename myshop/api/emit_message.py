import frappe
@frappe.whitelist(allow_guest=True)
def emit_custom_event(user=None, message="Hello"):
    try:
        print(f"Emitting event for user: {user or frappe.session.user}")
        print(f"Message: {message}")
        
        frappe.publish_realtime(
            event='my_custom_event',
            message={'msg': message},
            user=user or frappe.session.user,
            after_commit=True  # Add this to ensure it fires after commit
        )
        
        print("Event published successfully")
        return {"status": "success", "message": "Event emitted successfully"}
        
    except Exception as e:
        frappe.log_error(title="Error in emit_custom_event", message=str(e))
        return {"status": "error", "message": str(e)}



# @frappe.whitelist()
# def emit_message(message, user=None, show_msgprint=True, title="Notification"):
#     """Emit a message to the desk UI.

#     - Publishes the realtime event to the given user (or the current session user).
#     - Keeps the server-side msgprint for the caller by default, but this can be disabled
#       by setting show_msgprint=False.
#     """
#     # Determine target user: explicit user or current session user
#     target_user = user or frappe.session.user

#     # Emit the message event to the target user (None -> broadcast to all)
#     # Use a unified channel name 'custom_app_event' so clients subscribe once.
#     event = {
#         'message': message,
#         'title': title  # Added title parameter
#     }

#     if target_user:
#         frappe.publish_realtime('custom_app_event', event, user=target_user)
#     else:
#         frappe.publish_realtime('custom_app_event', event)

#     # Optional server-side msgprint for the caller
#     # if show_msgprint:
#     #     frappe.msgprint(_(message))
        
#     return {"success": True, "message": "Event emitted"}
