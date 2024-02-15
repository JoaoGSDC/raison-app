function validateRequiredFields(obj: any, fields: any) {
  const requireds: any[] = [];

  fields.forEach((field: any) => {
    if (obj[field] === undefined) {
      requireds.push({ message: `O campo ${field} é obrigatório` });
    }
  });

  return { hasError: requireds.length > 0, requireds };
}
