export const ok = (res, payload) => res.json(payload);
export const error = (res, status = 500, message = "Server error") => res.status(status).json({ message });
