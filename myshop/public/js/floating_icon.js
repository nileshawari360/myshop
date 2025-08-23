$(document).ready(function() {
    // Only add once
    if (document.getElementById('custom-floating-icon')) return;

    // Create the floating button/icon
    const btn = document.createElement('div');
    btn.id = 'custom-floating-icon';
    btn.innerHTML = '💬'; // or use an <img> tag for your favicon
    Object.assign(btn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #ccc',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 9999,
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
    });

    document.body.appendChild(btn);

    // On click: show Hello World message
    btn.addEventListener('click', function() {
        frappe.msgprint(__('Hello World'));
    });
});
