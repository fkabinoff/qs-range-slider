define( ["qlik", "css!./Slider.css"],
	function ( qlik ) {

		return {
			template: '<div class="slider-directive"><div class="slider"><div class="low ui-slider-handle"></div><div class="high ui-slider-handle"></div></div></div>',
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [{
						qWidth: 2,
						qHeight: 5000
					}]
				}
			},
			definition : {
				type : "items",
				component : "accordion",
				items : {
					dimensions: {
						uses: "dimensions",
						min: 1,
						max: 1
					},
					measures: {
						uses: "measures",
						min: 1,
						max: 1
					},
					sorting : {
						uses : "sorting"
					},
					settings: {
						uses: "settings",
						items: {
							min: {
								type: "number",
								label: "Min",
								ref: "settings.min",
								defaultValue: 0
							},
							max: {
								type: "number",
								label: "Max",
								ref: "settings.max",
								defaultValue: 100
							},
							step: {
								type: "number",
								label: "Step",
								ref: "settings.step",
								defaultValue: 1
							}
						}
					}
				}
			},
			support: {
				snapshot: false,
				export: false,
				exportData: false
			},
			controller: ['$scope', '$element', function ( $scope, $element ) {
				$scope.min = $scope.layout.qHyperCube.qMeasureInfo[0].qMin;
				$scope.max = $scope.layout.qHyperCube.qMeasureInfo[0].qMax;

				$scope.$slider = $($element.find(".slider")[0]).slider({
					animate: true,
					range: true,
					min: Number($scope.layout.settings.min),
					max: Number($scope.layout.settings.max),
					step: $scope.layout.settings.step,
					values: [$scope.min, $scope.max],
					create: function() {
						$($element.find(".low")[0]).text($scope.min);
						$($element.find(".high")[0]).text($scope.max);
					},
					slide: function(event, ui) {
						$($element.find(".low")[0]).text(ui.values[0]);
						$($element.find(".high")[0]).text(ui.values[1]);
					},
					change: function(event, ui) {
						if (event.originalEvent) {
							var range = {
								"qMeasureIx": 0,
								"qRange": {
									"qMin": ui.values[0],
									"qMax": ui.values[1],
									"qMinInclEq": true,
									"qMaxInclEq": true
								}
							};
							$scope.sliderLocked = true;
							$scope.backendApi.selectValues(0, [], false).then(function() {
								$scope.backendApi.selectRange([range], false).then(function() {
									$scope.sliderLocked = false;
								});
							});
						}
					}
				});

				$scope.component.model.Validated.bind(function() {
					if(!$scope.sliderLocked) {
						$scope.min = $scope.layout.qHyperCube.qMeasureInfo[0].qMin;
						$scope.max = $scope.layout.qHyperCube.qMeasureInfo[0].qMax;
						$scope.$slider.slider('values',[$scope.min,$scope.max]);
						$($element.find(".low")[0]).text($scope.min);
						$($element.find(".high")[0]).text($scope.max);
					}
				});
			}]
		};
	});

