# WhatsApp Web.js Integration API with Next.js & n8n

This project is a **Next.js** application that leverages **WhatsApp Web.js** to receive and process WhatsApp messages, exposing an API that sends structured data to an **n8n webhook**. It's designed for automation, customer service, or CRM workflows that require WhatsApp integration with external services.

---

## 📦 Features

- 📱 **WhatsApp Web.js Integration** – Connects with WhatsApp using headless browser automation.
- 🌐 **Next.js API Route** – Handles incoming requests and forwards processed data.
- 🔗 **n8n Webhook Integration** – Sends WhatsApp data to your custom automation workflows.
- 🔒 **Secure Webhook Communication** – Easily integrate with secure n8n endpoints.
- 🧪 **Hot Reloading** – Enjoy the fast developer experience of Next.js.
- 🛠️ Built with scalability and modularity in mind.

---

## ⚙️ Technologies Used

- [Next.js](https://nextjs.org/)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [n8n](https://n8n.io/)
- [Express](https://expressjs.com/) (inside a custom server, if used)
- [Puppeteer](https://pptr.dev/) (under the hood by whatsapp-web.js)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/whatsapp-next-n8n.git
cd whatsapp-next-n8n
