interface IEmplyeeDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  joinedDate: null | string;
}
// This function returns number of employees joined each year for the past 10 years
export const countEmployeesJoinedByYear = (employees: IEmplyeeDetails[]) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let result = [];

  for (let i = 0; i < 10; i++) {
    const year = currentYear - i;
    result.push({ date: `${year}`, value: 0 });
  }

  employees.forEach((employee) => {
    const joinedDate = new Date(employee.joinedDate);
    const joinedYear = joinedDate.getFullYear();

    if (joinedYear >= currentYear - 9 && joinedYear <= currentYear) {
      result = result.map((item: any) => {
        if (joinedYear === Number(item.date)) {
          item.value += 1;
        }
        return item;
      });
    }
  });

  return result;
};
