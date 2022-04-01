const isHexColor = (string) => (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(string))
export default isHexColor