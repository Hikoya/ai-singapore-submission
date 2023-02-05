// ** React Imports
import { useState, ChangeEvent, useEffect, useCallback } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { Review } from 'types/review'
import LoadingModal from 'src/components/LoadingModal'

interface Column {
  id: 'visit_date' | 'review_title' | 'review_desc'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'visit_date', label: 'Visit Date', minWidth: 170 },
  { id: 'review_title', label: 'Review Title', minWidth: 170 },
  { id: 'review_desc', label: 'Description', minWidth: 170 },
]

interface Data {
  visit_date: string
  review_title: string
  review_desc: string
}

const TableStickyHeader = () => {
  // ** States
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const [progress, setProgress] = useState(true)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const [rows, setRows] = useState<Review[]>([])

  const fetchData = useCallback(async () => {
    setProgress(true)

    try {
      const rawResponse = await fetch('/api/review/fetch', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const content = await rawResponse.json()
      if (content.status) {
        setRows(content.msg)
      }
    } catch (error) {
      console.error(error)
    }

    setProgress(false)
  }, [])

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchData()
    }

    asyncFunc()
  }, [fetchData])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {rows.length > 0 && (
        <>
          <LoadingModal isOpen={progress} onClose={undefined} />
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row.visit_date}>
                      {columns.map(column => {
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  )
}

export default TableStickyHeader
