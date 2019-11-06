import whiteHouseData from "./whiteHouseData"

const dataStore = {
  getSalaries: () => whiteHouseData,
  addSalary: (newSalary) => {
    const nextID = whiteHouseData.reduce((prev, current) => current.id > prev ? current.id : prev, 0) + 1
    newSalary.id = nextID

    whiteHouseData.push(newSalary)
    return newSalary
  },
  getSalaryByID: (id) => whiteHouseData.filter(val => val.id === id),
  updateSalary: (salary) => {
    const idx = whiteHouseData.findIndex((current) => current.id == salary.id)
    if (idx === -1)
      return

    whiteHouseData[idx] = salary
  }
}

export default dataStore