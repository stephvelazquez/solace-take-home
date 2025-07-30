import { Advocate } from "@/app/types/advocate-types"
import { formatPhoneNumber } from "@/app/utils/formatting"

interface TableProps {
  columnNames: string[]
  tableData: Advocate[]
}

export const Table = ({columnNames, tableData}: TableProps) => (
  <table style={{width: '100%', height: '100%'}}>
        <thead style={{borderBottom: '2px solid'}}>
          {/* 
            <th> cannot be direct child of <thead> -- need to wrap in <tr>
          */}
          <tr>
            {columnNames.map(name => (
              <th key={`${name}`}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((advocate, i) => (
            <tr key={`${i}-${advocate.lastName}`} style={{borderBottom: 'solid #d3d3d3'}}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((s) => (
                  <div key={`${s}`}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{formatPhoneNumber(advocate.phoneNumber)}</td>
            </tr>
            )
          )}
        </tbody>
      </table>
)