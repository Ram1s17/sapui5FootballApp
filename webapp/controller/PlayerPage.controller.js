sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function (Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.PlayerPage", {
		onInit: function () {
			var oViewModel = new JSONModel({
				currency: ["см", "кг"]
			});
			this.getView().setModel(oViewModel, "view");
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("player").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").playerPath),
				model: "football",
                parameters: {
                    expand: 'Personal2Sport'
                }
			});
		},
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("overview", {}, true);
			}
		},
		onOpenDialog : function () {
			if (!this.pDialog) {
				this.pDialog = this.loadFragment({
					name: "sap.ui.demo.walkthrough.view.Statistics"
				});
			} 
			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},
		onCloseDialog : function () {
			this.byId("statisticsDialog").close();
		}
	});
});