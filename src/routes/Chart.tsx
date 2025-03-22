import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from 'react-apexcharts'
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IProps {
  coinId: string;
}
interface IData {
  close: string; 
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function Chart({coinId}: IProps) {
  const { isLoading, data, error } = useQuery<IData[]>(['ohlcv',coinId],()=>fetchCoinHistory(coinId))
  const isDark = useRecoilValue(isDarkAtom)
  
  return (
    <div>
      { 
        isLoading ? 
          'Loading...' : 
          <ApexCharts 
            
            type="line" 
            series={[
                {
                  name: 'Price',
                  data: data?.slice(7,21).map((item)=>parseFloat(item.close))??[]
                }
            ]}
            options={{
              theme:{
                mode: isDark ? 'dark' : 'light'
              },
              chart: {
                width: '100%',
                height: '500px',
                background:'transparent',
                toolbar: {
                  show: false,
                }, 
              },
              grid: {
                show: false
              },
              yaxis: {
                show: false
              },
              xaxis: {
                categories: data?.map(item=>{
                  const date = new Date(item.time_close*1000);
                  const year = date.getFullYear()
                  const month = (date.getMonth()+1).toString().padStart(2,'0')
                  const day = date.getDate().toString().padStart(2,'0')
                  return `${year}-${month}-${day}`
                }),
                axisBorder: { 
                  show: false 
                },
                axisTicks: { 
                  show: false 
                },
                labels: {
                  show: false
                }
              },
              stroke: {
                curve: "smooth",
                width: 5
              },
              fill: {
                type: "gradient",
                gradient: {
                  gradientToColors:['#0be881'], stops:[0,100]
                }
              },
              colors: ['#0fbcf9'],
              tooltip: {
                y: {
                  formatter: (value)=>`$${value.toFixed(2)}`
                }
              }
            }}
          />
      }
    </div>
  )
}

export default Chart