import { Table as BTable, Form } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";
import PropTypes from "prop-types";
import axios from "axios";

export default function DataTable({ filters, setSelectedUser }) {
    // Fetch API data dynamically based on filters
    const { isPending, error, data = [], isFetching } = useQuery({
        queryKey: ["repoData", filters],
        queryFn: async () => {
            const response = await axios.get("/api/reports/", {
                params: filters
            });
            return response.data;
        }
    });

    const columnHelper = createColumnHelper();

    // Define columns for each table type
    const columns = {
        InputCream: [
            columnHelper.accessor("supplier", { header: "نام تامین کننده" }),
            //columnHelper.accessor("date", { header: "تاریخ" }),
            columnHelper.accessor("ph", { header: "PH" }),
            columnHelper.accessor("acid", { header: "Acid" }),
            columnHelper.accessor("fat", { header: "Fat" }),
            columnHelper.accessor("snf", { header: "SNF" }),
            columnHelper.accessor("weight", { header: "وزن" }),
            //columnHelper.accessor("inputdata", { header: "تاریخ ورود" }),
        ],

        ProcessReport: [
            //columnHelper.accessor("date", { header: "تاریخ" }),
            columnHelper.accessor("color", { header: "رنگ" }),
            columnHelper.accessor("palletnumber", { header: "شماره پالت" }),  // ✅ Fixed field name
            columnHelper.accessor("supplier", { header: "نام تامین کننده" }),
            columnHelper.accessor("fatbutter", { header: "Fat" }),  // ✅ Fixed field name
            columnHelper.accessor("tanknumber", { header: "شماره مخزن" }),  // ✅ Fixed field name
            columnHelper.accessor("acidbutter", { header: "اسیدیته" }),  // ✅ Fixed field name
            columnHelper.accessor("phbuttermilk", { header: "PH دوغ مخزن" }),  // ✅ Fixed field name
            columnHelper.accessor("acidbuttermilk", { header: "Acid دوغ مخزن" }),  // ✅ Fixed field name
            columnHelper.accessor("fatbuttermilk", { header: "Fat دوغ مخزن" }),  // ✅ Fixed field name
            columnHelper.accessor("snfbuttermilk", { header: "SNF دوغ مخزن" }),  // ✅ Fixed field name         
        ],

        Outputmilk: [
            columnHelper.accessor("supplier", { header: "محل ارسال" }),
            //columnHelper.accessor("date", { header: "تاریخ" }),
            columnHelper.accessor("ph", { header: "PH" }),
            columnHelper.accessor("acid", { header: "Acid" }),
            columnHelper.accessor("fat", { header: "Fat" }),
            columnHelper.accessor("snf", { header: "SNF" }),
            columnHelper.accessor("weight", { header: "وزن" }),
        ],

        Devices: [
            columnHelper.accessor("testdevice", { header: "دستگاه" }),
            //columnHelper.accessor("date", { header: "تاریخ" }),
            columnHelper.accessor("samplename", { header: "نام نمونه" }),
            columnHelper.accessor("sampleweight", { header: "وزن" }),
            columnHelper.accessor("coliformcount", { header: "کلی فرم" }),
            columnHelper.accessor("ecolicount", { header: "اشرشیاکلی" }),
            columnHelper.accessor("moldyeastcount", { header: "کیک و مخمبر" }),
            columnHelper.accessor("coldcount", { header: "شمارش کلی/سرماگرا" }),
        ],
    };


    // بررسی مقدار معتبر `columns`
    const tableColumns = columns[filters.tableType] || [];

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel()
    });

    const selectRow = async (e, row) => {
        try {
            const response = await fetch(`TaskReports/${row.original.faceId}`);
            if (!response.ok) {
                throw new Error("خطا در دریافت اطلاعات");
            }
            const userData = await response.json();
            setSelectedUser(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    return (
        <>

            {isFetching && <p>در حال دریافت اطلاعات جدید...</p>}

            {isPending ? (
                <p>در حال بارگذاری...</p>
            ) : error ? (
                <p>خطا در بارگذاری داده‌ها: {error.message}</p>
            ) : (
                <BTable striped bordered hover responsive>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                <th>#</th>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row, i) => (
                                <tr key={row.id} onClick={(e) => selectRow(e, row)}>
                                    <td>{i + 1}</td>
                                    {row.getVisibleCells().map((cell) => (
                                        <td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={tableColumns.length + 1} className="text-center">
                                    هیچ داده‌ای موجود نیست.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </BTable>
            )}
        </>
    );
}

// اعتبارسنجی props بعد از تعریف کامپوننت
DataTable.propTypes = {
    filters: PropTypes.object.isRequired,
    setSelectedUser: PropTypes.func
};