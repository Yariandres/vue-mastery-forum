export default (resouces: any, id: string | number) =>
  resouces.find((r: any) => r.id === id);
