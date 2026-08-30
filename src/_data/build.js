// Build-time facts. `date` is used to split talks into forthcoming/previous.
module.exports = { date: new Date().toISOString().slice(0, 10) };
