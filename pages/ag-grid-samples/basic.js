import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise';

const Basic = () => {
  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'name', filter: true, cellRenderer: 'agGroupCellRenderer' },
    {
      field: 'files',
      valueGetter: (params) => {
        return `${params.data.files.length} Documents/Files`;
      },
      // valueSetter: (params) => {
      //   params.data.name = params.newValue;
      //   return true;
      // },
    },
    { field: 'status', filter: true },
  ]);

  useEffect(() => {}, []);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
    // resizable: true,
    // colResizeDefault: 'shift',
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.debug('cellClicked', event);
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef.current.api.deselectAll();
  }, []);

  const onGridReady = useCallback((params) => {
    fetchGridAPI();
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
    // gridRef.current.columnApi.autoSizeColumns();
  }, []);

  // provide Detail Cell Renderer Params
  const detailCellRendererParams = {
    // provide the Grid Options to use on the Detail Grid
    detailGridOptions: {
      columnDefs: [{ field: 'name', flex: 1 }, { field: 'size' }, { field: 'status' }],
    },
    // get the rows for each Detail Grid
    getDetailRowData: (params) => {
      params.successCallback(params.data.files);
    },
  };

  const fetchGridAPI = () => {
    try {
      fetch('/api/grid')
        .then((response) => response.json())
        .then((data) => {
          setRowData(data?.batches);
        });
    } catch (ex) {
      console.debug(ex);
    }
  };

  return (
    <div>
      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div
        className="ag-theme-alpine"
        style={{ width: 'auto', height: '50vh' }}
      >
        <AgGridReact
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
          masterDetail
          detailCellRendererParams={detailCellRendererParams}
        />
      </div>
    </div>
  );
};

export default Basic;
