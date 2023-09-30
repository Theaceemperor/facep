import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Popover from '@mui/material/Popover';
import { CgPen, CgSearch } from "react-icons/cg";
import { SiXdadevelopers } from 'react-icons/si';
import { SearchBarAlone } from './search';
import WritePost from './WritePost';

export function NavSearch({children}) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <CgSearch className='text-xl text-indigo-800' {...bindTrigger(popupState)} />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <section className='p-2'><SearchBarAlone style={"placeholder:text-indigo-800/70"}/></section>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export function NavPost() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <CgPen className='text-xl text-indigo-800' {...bindTrigger(popupState)} />
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <section className='p-2'><WritePost /></section>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}

export function DevPop() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button 
          {...bindTrigger(popupState)}
          style={{
            display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center'
          }}
          >
            <h1 className='flex items-center text-[wheat] gap-1'>Add new development <SiXdadevelopers
            className='text-[#de4f0a]' /> </h1>
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography sx={{ p: 2 }} style={{background:'inherit'}}>
              <span>Feature not activated, checkback later!</span>
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}