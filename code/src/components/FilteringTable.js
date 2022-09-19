import React, { useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { COLUMNS} from "./columns"
import "../styles/table.css"
import {GlobalFilter} from "./GlobalFilter"
import Modal from "./modal"

// set up a component for the table that will take in and display the employee information
export const FilteringTable = (props) => {
    const columns = useMemo(() => COLUMNS, [])
    const data = props.data
    const tableInstance = useTable({
        columns,
        data,
        initialState: {pageIndex: 0}
    },
    useGlobalFilter,
    useSortBy,
    usePagination)

    // destructure table instance to get the required components
    const { 
        getTableProps,
        setPageSize,
        gotoPage,
        state,
        setGlobalFilter,
        getTableBodyProps, 
        canNextPage, 
        canPreviousPage, 
        headerGroups, 
        page, 
        nextPage, 
        previousPage, 
        pageOptions, 
        pageCount,
        prepareRow }
        = tableInstance

    const { globalFilter, pageSize, pageIndex } = state

    const [show, setShow] = useState(false);
    // Sets up the table JSX that will be displayed on the site, including a search filter functionality
    return (
        <>
        <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter} />
        <table {...getTableProps()}>
            <thead> 
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    <span>
                                        { column.isSorted ? ( column.isSortedDesc ? <img src="https://cdn-icons-png.flaticon.com/512/7185/7185279.png" alt="desc" /> : <img src="https://cdn-icons-png.flaticon.com/512/7185/7185283.png" alt="asc" />) : "" }
                                    </span>
                                </th>
                            ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    page.map( row=> {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onClick={() => setShow(true)}>
                                {
                                    row.cells.map( cell => {
                                        return <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                                    })
                                }
                            </tr>
                        )
                    })}
            </tbody>
        </table>
        {/* Sets up the pagination feature for the table */}
        <div className="pagination">
            <div className ="page">
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
            <select value = {pageSize} onChange = {e => setPageSize(Number(e.target.value))}>
                {
                    [10,25,50].map(pageSize => (
                        <option key = {pageSize} value = {pageSize}>
                            Show {pageSize}
                        </option>
                    ))
                }
            </select>
            <span>
                {' '}Go To Page: {' '} 
                <input type="number" defaultValue = {pageIndex + 1} onChange = {e => {
                    const pageNumber = e.target.value ? Number(e.target.value) -1 : 0
                    gotoPage(pageNumber)
                }} 
                style = {{ width: '50px'}}/>
            </span>
            
            </div>
            <div className = "nextPrevious">
            <button className = "btn btn-outline-secondary" onClick = {() => gotoPage(0)} disabled ={!canPreviousPage}>{'<<'}</button>
            <button className = "btn btn-outline-secondary" onClick = {() => previousPage()} disabled = {!canPreviousPage}>Previous</button>
            <button className = "btn btn-outline-secondary" onClick = {() => nextPage()} disabled = {!canNextPage}>Next</button>
            <button className = "btn btn-outline-secondary" onClick = {() => gotoPage(pageCount - 1)} disabled ={!canNextPage}>{'>>'}</button>
        </div>
        </div>
        {/* Modal */}
        <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
        <p>This is modal body</p>
        </Modal>
        </>
    )
}