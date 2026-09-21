"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Framing, ViewId, WerkstattSceneController } from "./scene-engine";
import { nextStation, stationOrder, stations, type StationId } from "./content";
import { useSoftScrollHold } from "./use-soft-scroll-hold";
import "./werkstatt.css";
