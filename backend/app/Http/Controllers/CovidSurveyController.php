<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Covid_survey;
use App\Covid_survey_history;
class CovidSurveyController extends Controller
{
	/**
     * @OA\Get(
     *     path="/api/survey",
     *     tags={"top10"},
     *     summary="Last 10 Survey",
     *     description="Last 10 Survey",
     *     operationId="survey",
     *     @OA\Response(
     *         response="default",
     *         description="json response"
     *     )
     * )
     */
    public function index() {
        return Covid_survey::where('id','!=',-1)->orderBy('id','desc')->take(10)->get();
    }

	/**
     * @OA\Post(
     *     path="/api/survey",
     *     tags={"create-survey"},
     *     summary="Create Survey",
     *     description="Isi Pertanyaan dari 1-21, dan latlon pengguna",
     *     operationId="survey",
	 *     @OA\Parameter(
     *          name="jenis_kelamin",
     *          description="Jenis Kelamin (pria/wanita)",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="string"
     *          )
     *     ),
     *     @OA\Parameter(
     *          name="pertanyaan_1",
     *          description="Saya pergi keluar rumah",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
     *     @OA\Parameter(
     *          name="pertanyaan_2",
     *          description="Saya menggunakan transportasi umum: online,angkot,bus,taksi,kereta api",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_3",
     *          description="Saya tidak memakai masker pada saat berkumpul dengan orang lain",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_4",
     *          description="Saya berjabat tangan dengan orang lain",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_5",
     *          description="Saya tidak membersihkan tangan dengan hand sanitizer/tissue basah sebelum pegang kemudi mobil/motor",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_6",
     *          description="Saya menyentuh benda/uang yang juga disentuh orang lain",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_7",
     *          description="Saya tidak menjaga jarak 1,5 meter dengan orang lain ketika: belanja, bekerja, belajar, ibadah",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_8",
     *          description="Saya makan diluar rumah (warung/restaurant)",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_9",
     *          description="Saya tidak minum hangat & cuci tangan dengan sabun setelah tiba di tujuan",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_10",
     *          description="Saya berada di wilayah kelurahan tempat pasien tertular",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_11",
     *          description="Saya tidak pasang hand sanitizer di depan pintu masuk, untuk bersihkan tangan sebelum pegang gagang (handle) pintu masuk rumah",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_12",
     *          description="Saya tidak mencuci tangan dengan sabun setelah tiba di rumah",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_13",
     *          description="Saya tidak menyediakan: tissue basah/antiseptic, masker, sabun antiseptic bagi keluarga di rumah",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_14",
     *          description="Saya tidak segera merendam baju&celana bekas pakai di luar rumah kedalam air panas/sabun",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_15",
     *          description="Saya tidak segera mandi keramas setelah saya tiba di rumah",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_16",
     *          description="Saya tidak mensosialisasikan check list penilaian resiko pribadi ini kepada keluarga di rumah",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_17",
     *          description="Saya dalam sehari tidak kena cahaya matahari minimal 15 menit",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_18",
     *          description="Saya tidak jalan kaki/berolah raga minimal 30 menit setiap hari",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_19",
     *          description="Saya jarang minum vitamin C & E, dan kurang tidur",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_20",
     *          description="Usia saya diatas 60 tahun",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="pertanyaan_21",
     *          description="Saya mempunyai penyakit: jantung/diabetes/gangguan pernafasan kronis",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="lat",
     *          description="Koordinat pengguna",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="string"
     *          )
     *     ),
	 *     @OA\Parameter(
     *          name="lon",
     *          description="Koordinat pengguna",
     *          required=true,
     *          in="query",
     *          @OA\Schema(
     *              type="string"
     *          )
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="{\'error\': true/false, \'message\': \'Output pesan\'}, field error bisa berisi true/false, messagenya berupa pesan Resiko Rendah/Resiko Sedang/Resiko Tinggi"
     *     )
     * )
     */
    public function create(request $request) {
		//check ip address
		$ip_address = $request->ip();
		$data = Covid_survey::where('ip_address', $ip_address)->first();
		$id = @$data->id;
		
		try {
			//total
			$sum = $request->pertanyaan_1 + $request->pertanyaan_2 + $request->pertanyaan_3 + $request->pertanyaan_4 + $request->pertanyaan_5 + $request->pertanyaan_6 + $request->pertanyaan_7 + $request->pertanyaan_8 + $request->pertanyaan_9 + $request->pertanyaan_10 + $request->pertanyaan_11 + $request->pertanyaan_12 + $request->pertanyaan_13 + $request->pertanyaan_14 + $request->pertanyaan_15 + $request->pertanyaan_16 + $request->pertanyaan_17 + $request->pertanyaan_18 + $request->pertanyaan_19 + $request->pertanyaan_20 + $request->pertanyaan_21;
			
			//hasil
			if ($sum <= 7) {
				$msg = "Resiko Rendah";
			} else if ($sum <= 14) {
				$msg = "Resiko Sedang";
			} else  if ($sum <= 21) {
				$msg = "Resiko Tinggi";
			}
			
			//check antara insert/update
			if (!isset($id)) {			
				$survey = new Covid_survey;
			} else {
				$survey = Covid_survey::find($id);
			}
			$survey->jenis_kelamin = $request->jenis_kelamin;
			$survey->pertanyaan_1 = $request->pertanyaan_1;
			$survey->pertanyaan_2 = $request->pertanyaan_2;
			$survey->pertanyaan_3 = $request->pertanyaan_3;
			$survey->pertanyaan_4 = $request->pertanyaan_4;
			$survey->pertanyaan_5 = $request->pertanyaan_5;
			$survey->pertanyaan_6 = $request->pertanyaan_6;
			$survey->pertanyaan_7 = $request->pertanyaan_7;
			$survey->pertanyaan_8 = $request->pertanyaan_8;
			$survey->pertanyaan_9 = $request->pertanyaan_9;
			$survey->pertanyaan_10 = $request->pertanyaan_10;
			$survey->pertanyaan_11 = $request->pertanyaan_11;
			$survey->pertanyaan_12 = $request->pertanyaan_12;
			$survey->pertanyaan_13 = $request->pertanyaan_13;
			$survey->pertanyaan_14 = $request->pertanyaan_14;
			$survey->pertanyaan_15 = $request->pertanyaan_15;
			$survey->pertanyaan_16 = $request->pertanyaan_16;
			$survey->pertanyaan_17 = $request->pertanyaan_17;
			$survey->pertanyaan_18 = $request->pertanyaan_18;
			$survey->pertanyaan_19 = $request->pertanyaan_19;
			$survey->pertanyaan_20 = $request->pertanyaan_20;
			$survey->pertanyaan_21 = $request->pertanyaan_21;
			$survey->lat = $request->lat;
			$survey->lon = $request->lon;
			$survey->hasil = $msg;
			$survey->ip_address = $ip_address;
			$survey->save();
			
			//save history
			$survey_history = new Covid_survey_history;
			$survey_history->jenis_kelamin = $request->jenis_kelamin;
			$survey_history->pertanyaan_1 = $request->pertanyaan_1;
			$survey_history->pertanyaan_2 = $request->pertanyaan_2;
			$survey_history->pertanyaan_3 = $request->pertanyaan_3;
			$survey_history->pertanyaan_4 = $request->pertanyaan_4;
			$survey_history->pertanyaan_5 = $request->pertanyaan_5;
			$survey_history->pertanyaan_6 = $request->pertanyaan_6;
			$survey_history->pertanyaan_7 = $request->pertanyaan_7;
			$survey_history->pertanyaan_8 = $request->pertanyaan_8;
			$survey_history->pertanyaan_9 = $request->pertanyaan_9;
			$survey_history->pertanyaan_10 = $request->pertanyaan_10;
			$survey_history->pertanyaan_11 = $request->pertanyaan_11;
			$survey_history->pertanyaan_12 = $request->pertanyaan_12;
			$survey_history->pertanyaan_13 = $request->pertanyaan_13;
			$survey_history->pertanyaan_14 = $request->pertanyaan_14;
			$survey_history->pertanyaan_15 = $request->pertanyaan_15;
			$survey_history->pertanyaan_16 = $request->pertanyaan_16;
			$survey_history->pertanyaan_17 = $request->pertanyaan_17;
			$survey_history->pertanyaan_18 = $request->pertanyaan_18;
			$survey_history->pertanyaan_19 = $request->pertanyaan_19;
			$survey_history->pertanyaan_20 = $request->pertanyaan_20;
			$survey_history->pertanyaan_21 = $request->pertanyaan_21;
			$survey_history->lat = $request->lat;
			$survey_history->lon = $request->lon;
			$survey_history->hasil = $msg;
			$survey_history->ip_address = $ip_address;
			$survey_history->save();

			return response()->json([
				'error' => false,
				'message' => $msg
			]);
		} catch(\Illuminate\Database\QueryException $e){ 
			return response()->json([
				'error' => true,
				'message' => 'Jawab semua pertanyaan yang tersedia!!!'
				// 'message' => $e->getMessage()
			]);
		} catch(\Exception $e){ 
			return response()->json([
				'error' => true,
				'message' => "Server Error"
			]);
		}
    }
}
