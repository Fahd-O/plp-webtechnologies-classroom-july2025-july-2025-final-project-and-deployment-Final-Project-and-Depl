/* ===== QUOTE FORM HANDLING (no backend) =====
     Behavior:
     - Validate form fields client-side.
     - If invalid: show message and add .was-validated (so CSS shows invalid styles).
     - If valid:
         - Build mailto: link prefilled with subject and body and open email client.
         - The "Send via WhatsApp" button opens WhatsApp with the same message.
     Notes:
     - Files cannot be attached automatically via mailto/wa links; user is reminded to attach manually.
  */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quoteForm");
    if (!form) return;
    const msgEl = document.getElementById("formMsg");
    const waBtn = document.getElementById("waBtn");

    function buildMessage(fields) {
      return [
        `Name: ${fields.name}`,
        `Email: ${fields.email}`,
        `Phone: ${fields.phone}`,
        `Carton Type: ${fields.type}`,
        `Size/Specs: ${fields.size || "N/A"}`,
        `Quantity: ${fields.quantity}`,
        `Material: ${fields.material || "N/A"}`,
        `Printing/Finish: ${fields.printing || "N/A"}`,
        `Delivery Location: ${fields.location}`,
        `Additional notes: ${fields.message || "N/A"}`,
        "",
        "Note: If you have files (logo/design), please attach them manually to the email or send via WhatsApp.",
      ].join("\n");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.classList.remove("was-validated");

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        if (msgEl) {
          msgEl.textContent = "Please complete the required fields.";
          msgEl.style.color = "#e11d48";
        }
        return;
      }

      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        type: form.type.value,
        size: form.size.value.trim(),
        quantity: form.quantity.value.trim(),
        material: form.material.value.trim(),
        printing: form.printing.value.trim(),
        location: form.location.value.trim(),
        message: form.message.value.trim(),
      };

      const subject = "Quote Request — Hibelive Cartons";
      const body = buildMessage(data);
      const mailto = `mailto:akinabdulqudus@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      if (msgEl) {
        msgEl.textContent = "Opening your email client...";
        msgEl.style.color = "black";
      }

      // Open user's email client with prefilled content
      window.location.href = mailto;
    });

    if (waBtn) {
      waBtn.addEventListener("click", () => {
        const fields = {
          name: form.name.value.trim(),
          phone: form.phone.value.trim(),
          type: form.type.value || "",
          size: form.size.value.trim() || "",
          quantity: form.quantity.value.trim() || "",
          location: form.location.value.trim() || "",
        };

        const waLines = [
          "Hello Hibelive, I would like a quote:",
          `Name: ${fields.name || "[your name]"}`,
          `Phone: ${fields.phone || "[phone]"}`,
          `Carton Type: ${fields.type || "[type]"}`,
          `Size/Specs: ${fields.size || "[size]"}`,
          `Quantity: ${fields.quantity || "[qty]"}`,
          `Delivery Location: ${fields.location || "[location]"}`,
          "",
          "Note: I will attach files separately if needed.",
        ];

        const waText = waLines.join("\n");
        const waUrl = `https://wa.me/2349022116041?text=${encodeURIComponent(
          waText
        )}`;
        window.open(waUrl, "_blank", "noopener");
      });
    }
  });
})();
