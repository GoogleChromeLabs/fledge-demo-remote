function log(label, o) {
  console.log(label, JSON.stringify(o, " ", " "))
}

function scoreAd(adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals) {
  log("scoreAd", {adMetadata, bid, auctionConfig, trustedScoringSignals, browserSignals})
  return bid
}

function reportResult(auctionConfig, browserSignals) {
  log("reportResult", {auctionConfig, browserSignals})
  sendReportTo(auctionConfig.seller + "/fledge/reporting?report=result")
  return {
    "success":          true,
    "signalsForWinner": {"signalForWinner": 1},
    "reportUrl":        auctionConfig.seller + "/report_seller",
  }
}
