import React, { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ModuleRegistry,
  AllCommunityModule,
  InfiniteRowModelModule
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { api } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

ModuleRegistry.registerModules([AllCommunityModule, InfiniteRowModelModule]);

function DeleteButtonRenderer(props) {
  const handleDelete = () => {
    const node = props.node;
    props.api.applyTransaction({ remove: [node.data] });
    api.delete(`/api/leads/${node.data.id}`)
      .then(() => props.api.refreshInfiniteCache())
      .catch((error) => console.error('Error deleting row:', error));
  };
  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}

export function LeadsTable() {
  const navigate = useNavigate();
  const gridApiRef = useRef(null);
  const pageSize = 20;

  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Source', field: 'source' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Score', field: 'score' },
    { headerName: 'Lead Value', field: 'lead_value' },
    { headerName: 'Last Activity', field: 'last_activity_at' },
    { headerName: 'Qualified', field: 'is_qualified' },
    { headerName: 'Created At', field: 'createdAt' },
    { headerName: 'Updated At', field: 'updatedAt' },
    {
      headerName: 'Actions',
      cellRenderer: 'deleteButtonRenderer',
      maxWidth: 120,
    },
  ];

  const datasource = {
    getRows: async (params) => {
      const page = Math.floor(params.startRow / pageSize) + 1;
      try {
        const response = await api.get('/api/leads', {
          params: { page, limit: pageSize },
        });
        const mapped = response.data.data.map((lead) => ({
          id: lead._id,
          name: `${lead.first_name} ${lead.last_name}`,
          email: lead.email,
          phone: lead.phone,
          source: lead.source,
          status: lead.status,
          score: lead.score,
          lead_value: lead.lead_value,
          last_activity_at: lead.last_activity_at,
          is_qualified: lead.is_qualified,
          createdAt: new Date(lead.createdAt).toLocaleString(),
          updatedAt: new Date(lead.updatedAt).toLocaleString(),
        }));
        params.successCallback(mapped, response.data.total);
      } catch (err) {
        console.error('Error fetching rows:', err);
        params.failCallback();
      }
    },
  };

  const onGridReady = (params) => {
    gridApiRef.current = params.api;
  };

  const onRowClicked = (event) => {
    const id = event.data.id;
    navigate(`/leads/${id}`); // adjust path to your route
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 600, width: '100%' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowModelType="infinite"
        datasource={datasource}
        cacheBlockSize={pageSize}
        maxBlocksInCache={2}
        pagination
        paginationPageSize={pageSize}
        getRowId={(params) => params.data.id}
        components={{ deleteButtonRenderer: DeleteButtonRenderer }}
        onGridReady={onGridReady}
        onRowClicked={onRowClicked}
      />
    </div>
  );
}
