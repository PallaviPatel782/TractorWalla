/**
* AUTO GENERATED FILE — DO NOT EDIT
*/
import React from 'react';
import { SvgProps } from 'react-native-svg';

import AllServices from './allServices.svg';
import Bike from './Bike.svg';
import ChevronBackward from './chevron_backward.svg';
import CurrentLocation from './current-location.svg';
import Home from './home.svg';
import KeyboardArrowUp from './keyboard_arrow_up.svg';
import Location from './Location.svg';
import Profile from './profile.svg';
import Search from './search.svg';
import Service from './service.svg';
import Setting from './setting.svg';
import Settings from './settings.svg';
import User from './user.svg';

export interface ISVGProps extends SvgProps {
  size?: number;
}

const resolveSize = (props: ISVGProps) => {
  const { size, width, height, ...rest } = props;
  return {
    width: width ?? size ?? 24,
    height: height ?? size ?? 24,
    ...rest,
  };
};

export const AllServicesIcon = (props: ISVGProps) => <AllServices fill={props.color} {...resolveSize(props)} />;
export const BikeIcon = (props: ISVGProps) => <Bike fill={props.color} {...resolveSize(props)} />;
export const ChevronBackwardIcon = (props: ISVGProps) => <ChevronBackward fill={props.color} {...resolveSize(props)} />;
export const CurrentLocationIcon = (props: ISVGProps) => <CurrentLocation fill={props.color} {...resolveSize(props)} />;
export const HomeIcon = (props: ISVGProps) => <Home stroke={props.color} fill="none" {...resolveSize(props)} />;

export const KeyboardArrowUpIcon = (props: ISVGProps) => <KeyboardArrowUp fill={props.color} {...resolveSize(props)} />;
export const LocationIcon = (props: ISVGProps) => <Location fill={props.color} {...resolveSize(props)} />;
export const ProfileIcon = (props: ISVGProps) => <Profile fill={props.color} {...resolveSize(props)} />;


export const SearchIcon = (props: ISVGProps) => <Search stroke={props.color} fill="none" {...resolveSize(props)} />;


export const ServiceIcon = (props: ISVGProps) => <Service stroke={props.color} fill="none" {...resolveSize(props)} />;
export const SettingIcon = (props: ISVGProps) => <Setting stroke={props.color} fill="none" {...resolveSize(props)} />;

export const SettingsIcon = (props: ISVGProps) => <Settings stroke={props.color} fill="none" {...resolveSize(props)} />;
export const UserIcon = (props: ISVGProps) => <User stroke={props.color} fill="none" {...resolveSize(props)} />;
