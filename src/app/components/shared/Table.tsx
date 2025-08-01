type GenericPrimitivesType = string | number | boolean | GenericPrimitivesType[]

type GenericPrimitivesObjectType = {[key: string]: GenericPrimitivesType}

interface TableProps {
  columnNames: string[]
  tableData: Array<GenericPrimitivesObjectType>
}

export const Table = ({columnNames, tableData}: TableProps) => (
  <table>
    <thead style={{borderBottom: '2px solid'}}>
      <tr>
        {columnNames.map(name => (
          <th key={`${name}`}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {tableData.map((dataObj) => {
        const uniqueKey = crypto.randomUUID()
        return (
          <tr key={uniqueKey} style={{ borderBottom: 'solid #d3d3d3' }}> {/** Use key generator since data can contain arrays */}
            {Object.keys(dataObj).map((datumKey, ind) => {
              const datumVal = dataObj[datumKey]
              const datumIsArr = Array.isArray(datumVal)
              return (
                <td key={datumIsArr ? `${uniqueKey}-${datumKey}` : datumVal.toString()}> {/** Cast value as string in case `datumVal` is type boolean */}
                  {datumIsArr
                    ? datumVal.map(item => (
                      <p>{item}</p>
                    ))
                    : `${datumVal}`}
                </td>
              )
            })}
            {/* <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((s) => (
                  <div key={`${s}`}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{formatPhoneNumber(advocate.phoneNumber)}</td> */}
          </tr>
        )
      })}
    </tbody>
  </table>
)