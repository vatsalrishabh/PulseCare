import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const WalletModal = ({ open, onClose, walletData }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <AccountBalanceWalletIcon sx={{ marginRight: 1 }} />
        Wallet Details
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Detail</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Balance</TableCell>
                <TableCell align="right">${walletData.balance}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Transaction</TableCell>
                <TableCell align="right">${walletData.lastTransaction}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Spent</TableCell>
                <TableCell align="right">${walletData.totalSpent}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default WalletModal;
