<?php

namespace App\Utilities;

use Illuminate\Support\Facades\Log;

class RequestUtil
{
    private const PREFIX = "REQUEST-UTIL> ";

    /**
     * Sends a HTTP request to the especified url
     *
     * @param string    $type             type of the request
     *                                    (POST, DELETE, GET, etc)
     * @param string    $url              url for the request.
     * @param stdObject $data             object with the data
     *                                    to be sent in the request.
     *                                    MUST be a stdObject
     * @param array     $extraHeader      array with additional headers
     * @param resourse  $content_decoding curl instance.
     * @param resourse  $curl             curl instance.
     *
     * @return object|string
     */
    public static function doRequest(
        $type,
        $url,
        $data,
        $extraHeader = [],
        bool $content_decoding = true,
        $curl = false
    ) {
        try {
            $flag = false;
            if (!$curl) {
                $curl = curl_init();
                $flag = true;
            }

            $header = ["Content-Type: application/json"];

            $header = array_merge($header, $extraHeader);

            curl_setopt_array(
                $curl,
                [
                    CURLOPT_URL            => $url,
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING       => "",
                    CURLOPT_MAXREDIRS      => 10,
                    CURLOPT_TIMEOUT        => 30,
                    CURLOPT_HTTP_VERSION   => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST  => $type,
                    CURLOPT_HTTPHEADER     => $header,
                    CURLOPT_POSTFIELDS     => json_encode($data),
                    CURLOPT_HTTP_CONTENT_DECODING => $content_decoding,
                ]
            );

            $response = curl_exec($curl);
            $err = curl_error($curl);

            if ($flag) {
                curl_close($curl);
            }
            if ($err) {
                return "cURL Error #:" . $err . "<br/>";
            } else {
                $decode = json_decode($response);
                if (is_null($decode)) {
                    Log::debug("REQUEST_UTIL_ERROR_DECODE> url: " . $url);
                    Log::debug(
                        "REQUEST_UTIL_ERROR_DECODE> response: "
                            . json_encode($response)
                    );
                }
                return $decode;
            }
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
