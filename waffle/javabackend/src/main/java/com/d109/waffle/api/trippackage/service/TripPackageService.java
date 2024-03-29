package com.d109.waffle.api.trippackage.service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.d109.waffle.api.trippackage.dto.AirplaneDto;
import com.d109.waffle.api.trippackage.dto.PackageHotelDto;
import com.d109.waffle.api.trippackage.dto.PackagePlaneDto;
import com.d109.waffle.api.trippackage.dto.RecommendDto;
import com.d109.waffle.api.trippackage.dto.RecommendResultDto;
import com.d109.waffle.api.trippackage.entity.Airplane;
import com.d109.waffle.api.trippackage.entity.FavoriteHotel;
import com.d109.waffle.api.trippackage.entity.FavoritePackage;
import com.d109.waffle.api.trippackage.entity.FavoritePlane;
import com.d109.waffle.api.trippackage.repository.AirplaneRepository;
import com.d109.waffle.api.trippackage.repository.FavoriteHotelRepository;
import com.d109.waffle.api.trippackage.repository.FavoritePackageRepository;
import com.d109.waffle.api.trippackage.repository.FavoritePlaneRepository;
import com.d109.waffle.api.user.entity.UserEntity;
import com.d109.waffle.api.user.repository.UserRepository;
import com.d109.waffle.common.auth.service.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
public class TripPackageService {
	private final AirplaneRepository airplaneRepository;
	private final FavoritePackageRepository favoritePackageRepository;
	private final FavoritePlaneRepository favoritePlaneRepository;
	private final FavoriteHotelRepository favoriteHotelRepository;
	private final JwtService jwtService;


	public List<AirplaneDto> getAirplaneList(){
		List<AirplaneDto> airplaneList = new ArrayList<>();
		List<Airplane> list = airplaneRepository.findAll();
		for(Airplane airplane : list){
			AirplaneDto plane = AirplaneDto.builder()
				.name(airplane.getName())
				.code(airplane.getCode())
				.city(airplane.getCity())
				.build();
			airplaneList.add(plane);
		}
		return airplaneList;
	}

	public int addFavorite(RecommendDto recommendDto, String authorization){
		List<PackagePlaneDto> planeDtos = recommendDto.getPlane();
		List<PackageHotelDto> hotelDtos = recommendDto.getHotel();
		int memberCnt = recommendDto.getMemberCnt();
		String card = recommendDto.getCard();
		Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
		if (!userEntity.isPresent()) {
			throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
		}
		UserEntity user = userEntity.get();
		FavoritePackage favoritePackage = FavoritePackage.builder()
			.memberCnt(memberCnt)
			.card(card)
			.userEntity(user)
			.build();
		int id = favoritePackageRepository.save(favoritePackage).getId();
		favoritePackage.setId(id);
		for (PackagePlaneDto planeDto : planeDtos) {
			FavoritePlane favoritePlane = FavoritePlane.builder()
				.planeDate(planeDto.getPlaneDate())
				.company(planeDto.getCompany())
				.startPlace(planeDto.getStartPlace())
				.startTime(planeDto.getStartTime())
				.endPlace(planeDto.getEndPlace())
				.endTime(planeDto.getEndTime())
				.originPrice(planeDto.getOriginPrice())
				.discountPrice(planeDto.getDiscountPrice())
				.layover(planeDto.getLayover())
				.during(planeDto.getDuring())
				.site(planeDto.getSite())
				.card(planeDto.getCard())
				.url(planeDto.getUrl())
				.companyImg(planeDto.getCompanyImg())
				.favoritePackage(favoritePackage)
				.build();
			favoritePlaneRepository.save(favoritePlane);
		}
		for (PackageHotelDto hotelDto : hotelDtos) {
			FavoriteHotel favoriteHotel = FavoriteHotel.builder()
				.hotelName(hotelDto.getHotelName())
				.start(hotelDto.getStart())
				.end(hotelDto.getEnd())
				.card(hotelDto.getCard())
				.originPrice(hotelDto.getOriginPrice())
				.discountPrice(hotelDto.getDiscountPrice())
				.url(hotelDto.getUrl())
				.img(hotelDto.getImg())
				.site(hotelDto.getSite())
				.favoritePackage(favoritePackage)
				.build();
			favoriteHotelRepository.save(favoriteHotel);
		}
		return id;
	}

	public List<RecommendResultDto> getFavoriteList(String authorization){
		Optional<UserEntity> userEntity = jwtService.accessHeaderToUser(authorization);
		if (!userEntity.isPresent()) {
			throw new NoSuchElementException("사용자 정보를 찾을 수 없습니다.");
		}
		UserEntity user = userEntity.get();
		List<FavoritePackage> list = favoritePackageRepository.findAllByUserEntity_Id(user.getId());
		List<RecommendResultDto> result = new ArrayList<>();
		for(FavoritePackage favoritePackage : list){
			List<FavoritePlane> planeList = favoritePlaneRepository.findAllByFavoritePackage_Id(favoritePackage.getId());
			List<FavoriteHotel> hotelList = favoriteHotelRepository.findAllByFavoritePackage_Id(favoritePackage.getId());
			List<PackagePlaneDto> packagePlaneDtos = new ArrayList<>();
			List<PackageHotelDto> packageHotelDtos = new ArrayList<>();
			for(FavoritePlane favoritePlane : planeList){
				PackagePlaneDto packagePlaneDto = new PackagePlaneDto();
				packagePlaneDto.setPlaneDate(favoritePlane.getPlaneDate());
				packagePlaneDto.setCompany(favoritePlane.getCompany());
				packagePlaneDto.setStartPlace(favoritePlane.getStartPlace());
				packagePlaneDto.setStartTime(favoritePlane.getStartTime());
				packagePlaneDto.setEndPlace(favoritePlane.getEndPlace());
				packagePlaneDto.setEndTime(favoritePlane.getEndTime());
				packagePlaneDto.setOriginPrice(favoritePlane.getOriginPrice());
				packagePlaneDto.setDiscountPrice(favoritePlane.getDiscountPrice());
				packagePlaneDto.setLayover(favoritePlane.getLayover());
				packagePlaneDto.setDuring(favoritePlane.getDuring());
				packagePlaneDto.setSite(favoritePlane.getSite());
				packagePlaneDto.setCard(favoritePlane.getCard());
				packagePlaneDto.setUrl(favoritePlane.getUrl());
				packagePlaneDto.setCompanyImg(favoritePlane.getCompanyImg());
				packagePlaneDtos.add(packagePlaneDto);
			}
			for(FavoriteHotel favoriteHotel : hotelList){
				PackageHotelDto packageHotelDto = new PackageHotelDto();
				packageHotelDto.setHotelName(favoriteHotel.getHotelName());
				packageHotelDto.setStart(favoriteHotel.getStart());
				packageHotelDto.setEnd(favoriteHotel.getEnd());
				packageHotelDto.setCard(favoriteHotel.getCard());
				packageHotelDto.setOriginPrice(favoriteHotel.getOriginPrice());
				packageHotelDto.setDiscountPrice(favoriteHotel.getDiscountPrice());
				packageHotelDto.setUrl(favoriteHotel.getUrl());
				packageHotelDto.setImg(favoriteHotel.getImg());
				packageHotelDto.setSite(favoriteHotel.getSite());
				packageHotelDtos.add(packageHotelDto);
			}
			RecommendResultDto recommendResultDto = RecommendResultDto.builder()
				.id(favoritePackage.getId())
				.memberCnt(favoritePackage.getMemberCnt())
				.card(favoritePackage.getCard())
				.plane(packagePlaneDtos)
				.hotel(packageHotelDtos)
				.build();
			result.add(recommendResultDto);
		}
		return result;
	}

	public boolean deleteFavorite(int id){
		try {
			favoritePlaneRepository.deleteByFavoritePackage_Id(id);
			favoriteHotelRepository.deleteByFavoritePackage_Id(id);
			favoritePackageRepository.deleteById(id);
			return true;
		}catch (Exception e){
			return false;
		}
	}
}
