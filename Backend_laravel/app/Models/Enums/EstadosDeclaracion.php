<?php

namespace App\Models\Enums;

enum EstadoDeclaracion: int {
    case SIN_HACER = 0;
    case PENDIENTE = 1;
    case POR_REVISAR = 2;
    case EN_REVISION = 3;
    case EN_CORRECCION = 4;
    case APROBADA = 5;
    case ENVIADA_CON_FIRMA = 6;
    case FINALIZADA = 7;
}