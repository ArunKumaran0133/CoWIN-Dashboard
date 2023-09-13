import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props

  return (
    <div className="gender-bg-container">
      <h1 className="gender-heading">Vaccination by gender</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={vaccinationByGender}
          endAngle={180}
          startAngle={0}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontFamily: 'Roboto', fontSize: 12}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
