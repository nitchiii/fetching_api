import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  console.log(data.data)

  const user_data = data.data
  return (
    <div>
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Nation{data.Nation}</TableHead>
      <TableHead>Year{data.Year}</TableHead>
      <TableHead>Population{data.Population}</TableHead>
      <TableHead className="text-right">Amount{data.Slug}</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {user_data.map((data, key) => (
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  ))}
  </TableBody>
</Table> 
    </div>
  )
}