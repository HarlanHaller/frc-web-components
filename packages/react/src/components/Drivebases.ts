import React from "react";
import { createComponent } from "@lit/react";
import {
  Differential as DifferentialWc,
  Mecanum as MecanumWc,
  Swerve as SwerveWc,
} from "@frc-web-components/fwc/components/drivebases";

export const Differential = createComponent({
  tagName: "frc-differential-drivebase",
  elementClass: DifferentialWc,
  react: React,
});

export const Mecanum = createComponent({
  tagName: "frc-mecanum-drivebase",
  elementClass: MecanumWc,
  react: React,
});

export const Swerve = createComponent({
  tagName: "frc-swerve-drivebase",
  elementClass: SwerveWc,
  react: React,
});
