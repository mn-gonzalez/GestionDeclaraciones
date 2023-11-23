<?php

namespace App\Models\Enums;

enum EstadoSolicitud: int {
    case POR_REVISAR = 1;
    case EN_REVISION = 2;
    case ACEPTADA = 3;
    case RECHAZADA = 4;
}