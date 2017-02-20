class VisitorsController < ApplicationController
    def create
        if Visitor.exists?(shortener_id: visitor_params[:shortener_id], location: visitor_params[:location], referrer: visitor_params[:referrer], start_at: visitor_params[:start_at])
            visitor = Visitor.where(shortener_id: visitor_params[:shortener_id], location: visitor_params[:location], referrer: visitor_params[:referrer], start_at: visitor_params[:start_at]).first
            if visitor
                visitor.increment!(:count)
                render json: visitor, status: :ok
            else
                render status: :unprocessable_entity
            end
        else
            visitor = Visitor.new(visitor_params)
            if visitor.referrer.empty?
                visitor.referrer = 'Dark traffic'
            end
            if visitor.save
                render json: visitor, status: :created 
            else
                render json: visitor.errors, status: :unprocessable_entity
            end
        end
    end

    def get_top_location
        shortener_ids = JSON.parse params[:shortener_ids]
        result = Visitor.select("location, sum(count) as total_clicks").where(shortener_id: shortener_ids).group("location").order("total_clicks").last
        render json: result, status: :ok
    end

    def get_top_referrer
        shortener_ids = JSON.parse params[:shortener_ids]
        result = Visitor.select("referrer, sum(count) as total_clicks").where(shortener_id: shortener_ids).group("referrer").order("total_clicks").last
        render json: result, status: :ok
    end

    def get_clicks_by_date
        from_date = params[:from_date].to_date
        to_date = params[:to_date].to_date
        result = Visitor.select("start_at, sum(count) as total_clicks").where(:shortener_id => params[:shortener_id], :start_at => from_date..to_date).group("start_at")
        render json: result, status: :ok
    end

    def get_clicks_by_location
        from_date = params[:from_date].to_date
        to_date = params[:to_date].to_date
        result = Visitor.select("location, sum(count) as total_clicks").where(:shortener_id => params[:shortener_id], :start_at => from_date..to_date).group("location")
        render json: result, status: :ok
    end

    def get_clicks_by_referrer
        from_date = params[:from_date].to_date
        to_date = params[:to_date].to_date
        result = Visitor.select("referrer, sum(count) as total_clicks").where(:shortener_id => params[:shortener_id], :start_at => from_date..to_date).group("referrer")
        render json: result, status: :ok
    end

    def get_count_click_by_date
        from_date = params[:from_date].to_date
        to_date = params[:to_date].to_date
        result = Visitor.select("sum(count) as count_click").where(:shortener_id => params[:shortener_id], :start_at => from_date..to_date)
        render json: result[0], status: :ok
    end

    private
    def visitor_params
        params.require(:visitor).permit(:shortener_id, :location, :referrer, :start_at, :count)
    end
end
