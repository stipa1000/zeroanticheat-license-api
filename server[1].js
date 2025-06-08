
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let licenses = require("./licenses.json");

app.post("/verify", (req, res) => {
    const key = req.body.key;
    const license = licenses.users.find(u => u.key === key);

    if (!license) {
        return res.status(403).json({ status: "invalid" });
    }

    if (license.expires !== "never" && new Date(license.expires) < new Date()) {
        return res.status(403).json({ status: "expired" });
    }

    return res.json({
        status: "valid",
        plan: license.plan,
        expires: license.expires
    });
});

app.listen(PORT, () => console.log(`License API running on port ${PORT}`));
