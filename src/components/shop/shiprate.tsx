import React, { useState, useEffect , Dispatch, SetStateAction,} from "react";

import { GetOrders, PutSelectRate } from "../../api/api";

import { useSnackbar } from "notistack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface propType {
  id: string;
  setTotalPrice:  Dispatch<SetStateAction<number>>;
  totalPrice: number;
}

const ShipRate: React.FC<propType> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [shipments, setShipments] = useState<any[]>([]);
  const [currentPlan, setCurrentPlan] = useState(10);

  useEffect(() => {
    const HandleGetOrders = async () => {
      const result: any = await GetOrders(props.id, enqueueSnackbar);
      setShipments(result.shippingInfo.rates);
      console.log(shipments);
    };
    HandleGetOrders();
  }, []);

  const handleSelectRate = async (shipment:any) => {
    const result = await PutSelectRate(props.id, shipment, enqueueSnackbar)
    const amount = parseFloat(shipment.amount);
    props.setTotalPrice(props.totalPrice + amount)
    console.log(result);
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Provider Icon</TableCell>
            <TableCell align="right">Provider Name</TableCell>
            <TableCell align="right">Duration Terms</TableCell>
            <TableCell align="right">Estimated Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shipments.length !== 0 ? (
            shipments.map((shipment, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  
                }}
                onClick={() => {setCurrentPlan(index), handleSelectRate(shipment)}}
              >
                <TableCell component="th" scope="row" sx={{backgroundColor: index === currentPlan ? "#2E3192" : "inherit"}}>
                  {index + 1}
                </TableCell>
                <TableCell align="right" sx={{backgroundColor: index === currentPlan ? "#2E3192" : "inherit"}}>{shipment.amount}</TableCell>
                <TableCell align="right" sx={{backgroundColor: index === currentPlan ? "#2E3192" : "inherit"}}>
                  <img src={shipment.provider_image_75} alt="Provider Icon" className="ml-auto"/>
                </TableCell>
                <TableCell align="right" sx={{backgroundColor: index === currentPlan ? "#2E3192" : "inherit"}}>{shipment.provider}</TableCell>
                <TableCell align="right" sx={{backgroundColor: index === currentPlan ? "#2E3192" : "inherit"}}>{shipment.duration_terms}</TableCell>
                <TableCell align="right" sx={{backgroundColor: index === currentPlan ? "#2E3192" : "inherit"}}>{shipment.estimated_days}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No shipments available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ShipRate;
