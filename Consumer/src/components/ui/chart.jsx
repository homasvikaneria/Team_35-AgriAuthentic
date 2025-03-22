import { Line, Bar, Tooltip, ResponsiveContainer } from "recharts"

export const Chart = ({ children }) => {
  return <div className="chart-container">{children}</div>
}

export const ChartContainer = ({ children, className }) => {
  return (
    <ResponsiveContainer className={className}>
      <Chart>{children}</Chart>
    </ResponsiveContainer>
  )
}

export const ChartGrid = () => {
  return <div className="chart-grid" />
}

export const ChartLine = ({ dataKey, name }) => {
  return <Line type="monotone" dataKey={dataKey} name={name} stroke="#8884d8" />
}

export const ChartTooltip = ({ children }) => {
  return <Tooltip>{children}</Tooltip>
}

export const ChartTooltipContent = () => {
  return <div className="tooltip-content">Tooltip Content</div>
}

export const ChartBar = ({ dataKey, name }) => {
  return <Bar dataKey={dataKey} name={name} fill="#82ca9d" />
}

